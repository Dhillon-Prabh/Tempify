import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ok from '../../images/user.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import './ProfileCard.css'

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TimeInputField from "../Schedule/timeInputField"


const styles = theme => ({
    card: {
      maxWidth: 275,
      height:430,
    },
    media: {
      height: 100,
    },
    container: {
        display: "flex",
        backgroundColor: "white",
        width: "35%",
        height: "70%",
        borderRadius: "5px",
        justifyContent: "center",
        alignItems: "center",
        outline: "none"
    }
  });


class ProfileCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookingId : this.props.bookingId,
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
    
    componentDidMount(){
        var self = this;
        var data = {
            bookingId: this.state.bookingId
        }
        console.log("BookingID", data.bookingId);
        fetch("http://localhost:3001/gigCard", {
          method: 'PUT',
          headers: {
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
                <CardMedia
                className={classes.media}
                image={ok}
                title="Temp"
                />
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
                    <span className="boldText">Parking option: {this.state.parking}</span>
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
                        <span className="ProfileCard-bookingID">BOOKING ID: {this.state.bookingRef}</span>
                    </Typography>
                </CardActionArea>
            </Card>
            <TimeInputField bookingId={this.state.bookingId}/>
        </div>
        )
    }
}
export default withStyles(styles, { withTheme: true })(ProfileCard);


