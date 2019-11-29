import React, { Component } from "react";
import ok from "../../images/user.png";
import "./ProfileCard.css";
import { withStyles } from "@material-ui/core/styles";
import PaymentButton from "../Payment/PayButton";

const styles = theme => ({
  outerContainer: {
    marginTop: "50px",
    marginLeft: "15px",
    width: "390px",
    height: "600px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    // backgroundColor: "rgb(248,248,248)",
    outline: "none",
    lineHeight: "1.25",
    fontFamily: "arial"
  },
  container: {
    width: "100%",
    height: "550px",
    display: "flex",
    flexDirection: "column",
    borderStyle: "solid",
    borderWidth: "2px",
    borderRadius: "8px",
    borderColor: "lightgray",
    overflow: "hidden",
    alignItems: "center",
    backgroundColor: "white"
  },
  imageContainer: {
    width: "100%",
    height: "22%",
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
    marginBottom: "10px"
  },
  image: {
    height: "100%"
  },
  nameContainer: {
    width: "100%",
    height: "10%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "25px",
    fontWeight: 800,
    borderTop: "1px solid lightgray",
    borderBottom: "1px solid lightgray",
    marginBottom: "10px"
  },
  outerStatusContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "38%",
    width: "100%"
  },
  statusContainer: {
    width: "100%",
    display: "flex",
    minHeight: "35px",
    maxHeight: "70px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "25px",
  },
  statusLeft: {
    fontSize: "16px",
    fontWeight: 400
  },
  statusRight: {
    fontSize: "18px",
    fontWeight: 800,
    textAlign: "center"
  },
  locationRateContainer: {
    width: "100%",
    display: "flex",
    height: "9%",
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "lightgray",
    marginTop: "40px"
  },
  locationAndImageContainer: {
    display: "flex",
    justifyContent: "center",
    width: "0%"
  },
  locationImage: {
    width: "20%",
    marginRight: "5px",
    height: "20px",
    backgroundColor: "gray"
  },
  location: {
    display: "flex",
    justifyContent: "left"
  },
  rate: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  bookingContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "9%",
    borderBottom: "1px solid lightgray"
  },
  bookingIDTitle: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    fontSize: "18px",
    fontWeight: 800
  },
  bookingID: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  paymentButtonContainer: {
    display: "flex",
    height: "12%",
    justifyContent: "center",
    alignItems: "center"
  }
});

class ProfileCard extends Component {
  constructor(props) {
    super(props);
    console.log("DisablePay", this.props.disablePay);
    this.state = {
      bookingId : this.props.bookingId,
      disablePay: this.props.disablePay,
      tempName: '',
      practice: '',
      software: '',
      experience: '',
      rate: '',
      bookingRef: ''
    }
  }

  componentDidMount() {
    var self = this;
    var data = {
      bookingId: this.state.bookingId
    };
    console.log("BookingID", data.bookingId);
    fetch("http://localhost:3001/gigCardOffice", {
      method: "PUT",
      headers: {
        'Authorization': 'Bearer ' + this.props.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        return res.json();
      })
      .then(result => {
        self.setState({
          tempName: result[0].temp_name,
          practice: result[0].type_of_practice,
          software: result[0].dental_software,
          experience: result[0].experience + " Years",
          rate: result[0].expected_rate,
          bookingRef: " " + result[0].reference_number
        });
        console.log(result);
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.outerContainer}>
        <div className={classes.container}>
          <div className={classes.imageContainer}>
            <img className={classes.image} src={ok} alt="profile image" />
          </div>
          <div className={classes.nameContainer}>{this.state.tempName}</div>
          <div className={classes.outerStatusContainer}>
            <div className={classes.statusContainer}>
              <div className={classes.statusLeft}>Practice:</div>
              <div className={classes.statusRight}>{this.state.practice}</div>
            </div>
            <div className={classes.statusContainer}>
              <div className={classes.statusLeft}>Software:</div>
              <div className={classes.statusRight}>{this.state.software}</div>
            </div>
            <div className={classes.statusContainer}>
              <div className={classes.statusLeft}>Experience:</div>
              <div className={classes.statusRight}>
                {this.state.experience}
              </div>
            </div>
          </div>
          <div className={classes.locationRateContainer}>
            <div className={classes.locationAndImageContainer}>
              {/* <div className={classes.locationImage}></div>
              <div className={classes.location}>Location</div> */}
            </div>
            <div className={classes.rate}>${this.state.rate} / Hour</div>
          </div>
          <div className={classes.bookingContainer}>
            <div className={classes.bookingIDTitle}>Booking ID: {this.state.bookingRef}</div>
            {/* <div className={classes.bookingID}>{this.state.bookingRef}</div> */}
          </div>
          <div className={classes.paymentButtonContainer}>
            {this.state.disablePay ? null : <PaymentButton token = {this.props.token} gigId={this.state.bookingId} />}
        </div>
        </div>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(ProfileCard);
