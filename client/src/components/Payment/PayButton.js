import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography'
import Payment from './Braintree';
import SuccessAlert from '../Alert/SuccessAlert';
import FailAlert from '../Alert/FailAlert';
import './Payment.css'

/**
 * Component for the modal for a gig on the dental office side.
 * Information about the gig is displayed along with a pay button.
 * Dental offices are not allowed to change input hours. If a discrepency
 * is found, an admin is required to make changes.
 * Displays a success snackbar if a transaction is successful, otherwise
 * displays a failure snackbar.
 * 
 * @author John Ham
 * @version 1.0
 */

class PayButton extends Component{
  constructor(props) {
    super(props);
    this.state = {
        gigId: props.gigId,
        success: null,
        setSuccessOpen: false,
        setFailOpen: false,
        isFull: true,
        setPayOpen: false,
        payOpen: false,
    }
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClickClose = this.handleClickClose.bind(this);
    this.onComplete = this.onComplete.bind(this);
  }

  async componentDidMount() {
    var data = {gigId: this.state.gigId};
    // Gets gig details from the database.
    await fetch("http://localhost:3001/getGigDetails", {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this.props.token,
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
        hours: response.hours,
        serviceFee: response.serviceFee,
        gst: response.gst,
        total: response.total
      });
    }).catch((error) => {
    });
  }

  // Opens the modal
  handleClickOpen = () => {
    this.setState({
      setPayOpen: true
    });
  };

  // Closes the modal and removes snackbars
  handleClickClose = () => {
    this.setState({
      setPayOpen: false,
      setSuccessOpen: false,
      setFailOpen: false
    });
  };

  // Displays snackbar based on response from server
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
      <div className="container">
        <Button onClick={this.handleClickOpen} className='payButton'>
            PAY
        </Button>
        <Dialog
          open={this.state.setPayOpen}
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
            <Payment total={this.state.total} gigId={this.state.gigId} onFinish={this.onComplete}/>
          </DialogContent>
        </Dialog>
        {this.state.setFailOpen ? <FailAlert type="paymentFail" /> : null}
        {this.state.setSuccessOpen ? <SuccessAlert type="paymentSuccess" /> : null}
      </div>
    );
  }
}

export default PayButton;
