import React from 'react'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import ok from '../../images/Ok_48px_1.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import './ProfileCard.css'

const office = true;

class ProfileCard extends React.Component {
    
    render() {
        return (
            <OfficeCard status="Completed" practice="General" software="Dentrix" experience="10 years" location="Vancouver" wage="50" bookingId="TMPSKD3O123"/>
        )
    }
}

const OfficeCard = (props) => {
    return (
        <Grid className="profileCard" justify="space-between" direction="column">
            <Grid container direction="row" alignItems="center">
                <img src={ok} className="profileCardImage" alt=""/>
                <Typography className="flexGrow boldText" align="center">
                    TEMP
                </Typography>
            </Grid>
            <Grid className="profileCardBorder" align="center">
                <Typography>
                    Status : <span className="boldText">{props.status}</span>
                </Typography>
                <Typography>
                    Practice : <span className="boldText">{props.practice}</span>
                </Typography>
                <Typography>
                    Software : <span className="boldText">{props.software}</span>
                </Typography>
                <Typography>
                    Experience : <span className="boldText">{props.experience}</span>
                </Typography>
            </Grid>
            <Grid className="profileCardBottom" direction="column">
                <Grid container direction="row" justify="space-between" className="profileCardBorder">
                    <Typography className="boldText">
                        <FontAwesomeIcon icon={faMapMarkerAlt}/> {props.location}
                    </Typography>
                    <Typography>
                        ${props.wage}/hr
                    </Typography>
                </Grid>
                <Grid container justify="center" className="profileCardBorder">
                    <Typography className="boldText">
                        Booking ID: {props.bookingId}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ProfileCard;