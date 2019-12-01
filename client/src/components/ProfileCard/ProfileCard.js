import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import ok from "../../images/user.png";
import "./ProfileCard.css";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import TimeInputField from "../Schedule/timeInputField";

/**
 * Profile card for the temps with the office information
 * @author Prabhdeep Singh
 */

/**
 * styles for this component
 * @param theme 
 */
const styles = theme => ({
  card: {
    maxWidth: 310,
    height: 490,
    padding: "10px"
  },
  media: {
    height: 100
  },
  container: {
    display: "flex",
    backgroundColor: "white",
    width: "520px",
    height: "540px",
    borderRadius: "5px",
    justifyContent: "center",
    alignItems: "center",
    outline: "none"
  },
  imageContainer: {
    height: "135px",
    display: "flex",
    justifyContent: "center",
    borderBottom: "1px solid lightgray",
    paddingBottom: "10px"
  },
  image: {
    height: "100%"
  }
});

class ProfileCard extends Component {
  constructor(props) {
      super(props);
      console.log("displayHours:" , this.props.displayHours);
      this.state = {
          bookingId : this.props.bookingId,
          displayHours : this.props.displayHours,
          token: this.props.token,
          officeName: '',
          address1: '',
          address2: '',
          parking: '',
          Status: '',
          phone: '',
          email: '',
          date: '',
          bookingRef: ''
      }
  }
  
  /**
   * Fetches the information for the office to show on the card
   */
  componentDidMount(){
      var self = this;
      var data = {
          bookingId: this.state.bookingId
      }
      console.log("BookingID", data.bookingId);
      fetch("http://localhost:3001/gigCard", {
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
            officeName: result[0].office_name,
            address1: result[0].unit_number + ", " + result[0].street_name + ", " + result[0].street_number,
            address2: result[0].city,
            parking: result[0].parking_options,
            phone: result[0].phone_number,
            email: result[0].email,
            date: result[0].dates + " " + result[0].timings,
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
      <div className={classes.container}>
        <Card className={classes.card}>
          <div className={classes.imageContainer}>
            <img className={classes.image} src={ok} alt="profile image" />
          </div>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.state.officeName}
            </Typography>
            <Typography>
              <span className="boldText">{this.state.address1}</span>
            </Typography>
            <Typography>
              <span className="boldText">{this.state.address2}</span>
            </Typography>
            <Typography>
              <span className="boldText">
                Parking option: {this.state.parking}
              </span>
            </Typography>
            <Typography>
              <span className="boldText">Status: {this.props.status}</span>
            </Typography>
          </CardContent>
          <CardContent className="profileCard-section2">
            <Typography>
              <span className="boldText">{this.state.phone}</span>
            </Typography>
            <Typography>
              <span className="boldText">{this.state.email}</span>
            </Typography>
            <Typography>
              <span className="ProfileCard-bookingdate">Booking Dates</span>
            </Typography>
            <Typography>
              <span className="boldText">{this.state.date}</span>
            </Typography>
          </CardContent>
          <CardActionArea>
            <Typography>
              <div className="ProfileCard-bookingID">
                BOOKING ID: {this.state.bookingRef}
              </div>
            </Typography>
          </CardActionArea>
        </Card>
        {this.state.displayHours ? <TimeInputField bookingId={this.state.bookingId} token={this.state.token}/> : null}
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(ProfileCard);
