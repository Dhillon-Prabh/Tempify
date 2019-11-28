import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ok from "../../images/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import "./ProfileCard.css";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import TimeInputField from "../Schedule/timeInputField";
import PaymentButton from "../Payment/PayButton";

const styles = theme => ({
  outerContainer: {
    marginTop: "50px",
    marginLeft: "15px",
    width: "350px",
    height: "84%",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    // backgroundColor: "rgb(248,248,248)",
    outline: "none",
    lineHeight: "1.15"
  },
  container: {
    width: "280px",
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
    height: "160px",
    backgroundColor: "yellow"
  },
  nameContainer: {
    width: "100%",
    height: "70px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "25px",
    fontWeight: 800,
    borderTop: "1px solid lightgray",
    borderBottom: "1px solid lightgray",
    marginBottom: "10px"
  },
  statusContainer: {
    width: "80%",
    display: "flex",
    minHeight: "35px",
    maxHeight: "70px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  statusLeft: {
    marginTop: "30px",
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
    height: "55px",
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
    width: "50%"
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
    width: "50%",
    display: "flex",
    justifyContent: "center"
  },
  bookingContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "90px",
    borderBottom: "1px solid lightgray",
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
    alignItems: "center",
  },
  paymentButtonContainer: {
    display: "flex",
    height: "100px",
    justifyContent: "center",
    alignItems: "center"
  }
});

class ProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingId : this.props.bookingId,
      tempName: '',
      practice: '',
      software: '',
      experience: '',
      rate: '',
      bookingRef: ''
    }
  }

  componentDidMount(){
    var self = this;
    var data = {
        bookingId: this.state.bookingId
    }
    console.log("BookingID", data.bookingId);
    fetch("http://localhost:3001/gigCardOffice", {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + this.props.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => {
      return res.json();
    }).then(result => {  
      self.setState({
          tempName: result[0].temp_name,
          practice: result[0].type_of_practice,
          software: result[0].dental_software,
          experience: result[0].experience,
          rate: result[0].expected_rate,
          bookingRef: result[0].reference_number
      })
      console.log(result);
    }).catch(function(err) {
      console.log(err);
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.outerContainer}>
        <div className={classes.container}>
          <div className={classes.imageContainer}></div>
          <div className={classes.nameContainer}>{this.state.tempName}</div>
          <div className={classes.statusContainer}>
            <div className={classes.statusLeft}>Practice:</div>
            <div className={classes.statusRight}>{this.state.practice}</div>
          </div>
          <div className={classes.statusContainer}>
            <div className={classes.statusLeft}>Software:</div>
            <div className={classes.statusRight}>
              {this.state.software}
            </div>
          </div>
          <div className={classes.statusContainer}>
            <div className={classes.statusLeft}>Experience:</div>
            <div className={classes.statusRight}>{this.state.experience} Years</div>
          </div>
          <div className={classes.locationRateContainer}>
            <div className={classes.locationAndImageContainer}>
              <div className={classes.locationImage}></div>
              <div className={classes.location}>Location</div>
            </div>
            <div className={classes.rate}>${this.state.rate} / Hour</div>
          </div>
          <div className={classes.bookingContainer}>
            <div className={classes.bookingIDTitle}>Booking ID</div>
            <div className={classes.bookingID}>{this.state.bookingRef}</div>
          </div>
          <div className={classes.paymentButtonContainer}>
          <PaymentButton gigId={this.state.bookingId}/>
        </div>
        </div>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(ProfileCard);
