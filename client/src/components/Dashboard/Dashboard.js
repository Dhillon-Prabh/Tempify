import React, {Component} from 'react';
import './Dashboard.css';
import { Grid } from '@material-ui/core';
import {Link, NavLink} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SvgIcon from '@material-ui/core/SvgIcon';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BookNow from '../BookNow/BookNow';
import History from '../History/History';
import Schedule from '../Schedule/scheduleForOffice';

import "./main.scss";

function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
}

class Dashboard extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          user: '',
          bookNow: true,
          schedule: false,
          history: false,
        }
    
        this.navigateBookNow = this.navigateBookNow.bind(this);
        this.navigateSchedule = this.navigateSchedule.bind(this);
        this.navigateHistory = this.navigateHistory.bind(this);
    }

    navigateBookNow() {
        this.setState({
          bookNow: true,
          schedule: false,
          history: false
        })
    }
    
    navigateSchedule() {
    this.setState({
        bookNow: false,
        schedule: true,
        history: false
    })
    }
    
    navigateHistory() {
    this.setState({
        bookNow: false,
        schedule: false,
        history: true
    })
    }

    render() {
        return(
            <React.Fragment>
                <Grid container direction="row" justify="center" alignItems="center" className="options">
                <div className="tempDateboardOuterContainer">
                    <Grid item xs={2}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link to="/dashboard" style={{textDecoration:'none', color: 'inherit'}}>
                                <ListItem button>
                                    <ListItemIcon>
                                        <HomeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Home" />
                                </ListItem>
                            </Link>
                            <Typography color="textPrimary">dashboard</Typography>
                        </Breadcrumbs>
                    </Grid> 
                    <Grid item xs={6}>
                    <div className="dashboardContainer">
                        <ButtonGroup className="buttons" size="large" aria-label="small contained button group" >
                            <Button className={this.state.bookNow ? "officeActiveButton" : "button"} onClick={this.navigateBookNow}>Book Now</Button>
                            <Button className={this.state.schedule ? "officeActiveButton" : "button"} onClick={this.navigateSchedule}>Schedule</Button>
                            <Button className={this.state.history ? "officeActiveButton" : "button"} onClick={this.navigateHistory}>History</Button>
                        </ButtonGroup>
                        </div>
                    </Grid>
                    </div>
                </Grid>
                {this.state.bookNow ? <BookNow token = {this.props.token}/> : null }
                {this.state.schedule ? <Schedule token = {this.props.token}/> : null }
                {this.state.history ? <History token = {this.props.token}/> : null }
            </React.Fragment>
        );
    }
}

export default Dashboard;

