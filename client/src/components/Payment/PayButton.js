import React, { Component, lazy, Suspense } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography'
import Payment from './Braintree';
import './Payment.css'

class PayButton extends Component{

  constructor(props) {
    super(props);

    this.state = {
        gigId: 1,
        success: null,
        setSuccessOpen: false,
        setFailOpen: false,
        isFull: true,
        hours: 0,
        wages: 0,
        setPayOpen: false,
        payOpen: false,
    }
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClickClose = this.handleClickClose.bind(this);
    this.calcAmount = this.calcAmount.bind(this);
    this.calcGST = this.calcGST.bind(this);
    this.calcServiceFee = this.calcServiceFee.bind(this);
    this.calcTotal = this.calcTotal.bind(this);
    this.onComplete = this.onComplete.bind(this);
  }

  calcAmount() {
      this.setState({ amount: this.state.hours * this.state.wages });
  }

  calcServiceFee() {
    this.setState({ serviceFee: this.state.amount * 0.15 });
  }

  calcGST() {
      this.setState({ gst: this.state.amount * 0.05 });
  }

  calcTotal() {
      this.setState({ total: this.state.amount + this.state.serviceFee + this.state.gst });
  }

  async componentDidMount() {
    var data = {gigId: this.state.gigId};
    await fetch("http://localhost:3001/getGigDetails", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => {
       return response.json();
    })
    .then((response) => {
        this.setState({
          wages: response.wages,
          hours: response.hours
        });
    })
    .catch((error) => {
    });
    console.log(this.state.wages);
    console.log(this.state.hours);
    await this.calcAmount();
    await this.calcServiceFee();
    await this.calcGST();
    await this.calcTotal();
    console.log(this.state.total);
  }

  handleClickOpen = () => {
    this.setState({
      setPayOpen: true
    });
  };

  handleClickClose = () => {
    this.setState({
      setPayOpen: false,
      setSuccessOpen: false,
      setFailOpen: false
    });
  };

  onComplete = (outcome) => {
      this.setState({success: outcome});
      if (this.state.success != null) {
          this.setState({
              setPayOpen: false
          });
      }
      if (this.state.success) {
        this.setState({ setSuccessOpen: true })
      } else {
        this.setState({ setFailOpen: true })
      }
  }
    
  render() {

    return (
      <div>
        <Button onClick={this.handleClickOpen} className='payButton'>
            PAY
        </Button>


        <Dialog
          open={this.state.setPayOpen}
          keepMounted
          onClose={this.handleClickClose}
          className='paymentModal'
          fullWidth={this.state.isFull}
          maxWidth='sm'
        >
          <DialogTitle>Make Payment to Tempify</DialogTitle>
          <DialogContent>
            <Typography>
                Temp's total work in hrs: {this.state.hours}
            </Typography>
            <Typography>
                Temp wages: ${this.state.wages}
            </Typography>
            <Typography>
                Service fee: ${this.state.serviceFee}
            </Typography>
            <Typography>
                GST (5%): ${this.state.gst}
            </Typography>
            <Typography>
                Total charges: ${this.state.total}
            </Typography>
            <Payment total={this.state.total} onFinish={this.onComplete}/>
          </DialogContent>
        </Dialog>

        <Dialog
          open={this.state.setSuccessOpen}
          keepMounted
          onClose={this.handleClickClose}
        >
          <DialogTitle>Payment Success!</DialogTitle>
          <DialogContent>
              Thank you
          </DialogContent>
        </Dialog>

        <Dialog
          open={this.state.setFailOpen}
          keepMounted
          onClose={this.handleClickClose}
        >
          <DialogTitle>Uh Oh! A Problem Occurred.</DialogTitle>
          <DialogContent>
              Please try payment again.
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}


export default PayButton;
