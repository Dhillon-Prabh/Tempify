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
    }
  });


class ProfileCard extends Component {

    constructor(props) {
        super(props);
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
                    <div className="contaner">
                        <div className="titleContainer">
                        
                        </div>
                    </div>
                <Typography gutterBottom variant="h5" component="h2">
                    TEMP
                </Typography>
                <Typography>
                    <span className="boldText">3700, Willingdon ave, 327</span>
                </Typography>
                <Typography>
                    <span className="boldText">Burnaby BC Canada</span>
                </Typography>
                <Typography>
                    <span className="boldText">Parking option: Free</span>
                </Typography>
                <Typography>
                    <span className="boldText">Status: {this.props.status}</span>
                </Typography>
                </CardContent>
                <CardContent className="profileCard-section2">
                    <Typography>
                        <span className="boldText">7788836754</span>
                    </Typography>
                    <Typography>
                        <span className="boldText">fiveguysbcit@gmail.com</span>
                    </Typography>
                    <Typography>
                        <span className="ProfileCard-bookingdate">Booking Dates</span>
                    </Typography>
                    <Typography>
                        <span className="boldText">2019-10-16 6:00am-8:45pm</span>
                    </Typography>
                </CardContent>             
                <CardActionArea>
                    <Typography>
                        <span className="ProfileCard-bookingID">BOOKING ID: {this.props.bookingId}</span>
                    </Typography>
                </CardActionArea>
            </Card>
            <TimeInputField />
        </div>
        )
    }
}
export default withStyles(styles, { withTheme: true })(ProfileCard);


