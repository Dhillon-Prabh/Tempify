import React from "react";
import DropIn from "braintree-web-drop-in-react";
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

/**
 * Component for inputting credit card information using Braintree's web dropin api.
 * Requires receiving a Braintree generated token from the server and a nonce
 * from Braintree. Transaction requires sending token, nonce, and payment amount
 * to the server.
 * A circular progress bar will be displayed until a token is received from the 
 * server.
 * 
 * @author John Ham
 * @version 1.0
 */

class Payment extends React.Component {
  instance;
  state = {
    payAmount: 0,
    clientToken: null
  };
 
  async componentDidMount() {
    // Get a client token for authorization from the server.
    await fetch("http://localhost:3001/payment", {
      // Checks if the user is logged in.
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
    this.setState({ payAmount: this.props.total });
    const transaction = await this.instance.requestPaymentMethod();
    var data = {
      payAmount: this.state.payAmount, 
      transaction: transaction, 
      gigId: this.props.gigId 
    };
    var success;
    // Send the nonce to the server.
    await fetch(`http://localhost:3001/checkout/`, {
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
         success = responseJson.success;
      })
      .catch((error) => {
         console.error(error);
      });
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