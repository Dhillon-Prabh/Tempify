import React from "react";
import DropIn from "braintree-web-drop-in-react";
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

class Payment extends React.Component {
  instance;
 
  state = {
      payAmount: 0,
    clientToken: null
  };
 
  async componentDidMount() {
    // Get a client token for authorization from your server

    await fetch("http://localhost:3001/payment", {
      headers: {
        'Authorization': 'Bearer ' + this.props.token,
      },
    })
    .then((response) => {
       return response.json();
    })
    .then((response) => {
        this.setState({
          clientToken: response.clientToken
        });
    })
    .catch((error) => {
    });
    console.log("MOUNTED");
  }
 
  async pay() {
    // Send the nonce to your server
    this.setState({ payAmount: this.props.total });
    const transaction = await this.instance.requestPaymentMethod();
    var data = {payAmount: this.state.payAmount, transaction: transaction, gigId: this.props.gigId };
    var success;
    await fetch(`/auth/checkout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then((response) => {
         return response.json();
      })
      .then((responseJson) => {
         console.log(responseJson);
        //  console.log(responseJson.transaction);
         success = responseJson.success;
        //  console.log(responseJson.success);
      })
      .catch((error) => {
         console.error(error);
      });
      if(success) {
          console.log("SUCCESS");
      } else {
          console.log("FAILED");
      }
      this.props.onFinish(success);
      window.location.reload();
  }
 
  render() {
    if (!this.state.clientToken) {
      return (
        <div>
            <CircularProgress />
        </div>
      );
    } else {
      return (
        <div>
          <DropIn
            options={{ authorization: this.state.clientToken }}
            onInstance={instance => (this.instance = instance)}
            paypal
          />
          <Button variant="outlined" onClick={this.pay.bind(this)}>Pay Now</Button>
        </div>
      );
    }
  }
}

export default Payment;