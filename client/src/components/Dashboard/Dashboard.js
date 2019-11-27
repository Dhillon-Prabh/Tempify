import React from 'react';
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
import Schedule from '../Schedule/scheduleForOffice';
import Records from '../Records/Records';

function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
}

class Dashboard extends React.Component {
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

    componentDidMount(){
        fetch("http://localhost:3001/tempProfile", {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + this.props.token,
          },
        }).then(res => {
          return res.json();
        }).then(result => {     
    
          this.setState({
            user: result[0].temp_name,
            bookNow: true
          });
        }).catch(function(err) {
          console.log(err);
        });
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
                        <ButtonGroup className="buttons" size="large" aria-label="small contained button group" >
                            <Button className={this.state.bookNow ? "activeButton" : "button"} onClick={this.navigateBookNow}>Book Now</Button>
                            <Button className={this.state.schedule ? "activeButton" : "button"} onClick={this.navigateSchedule}>Schedule</Button>
                            <Button className={this.state.history ? "activeButton" : "button"} onClick={this.navigateHistory}>History</Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
                {this.state.bookNow ? <BookNow/> : null }
                {this.state.schedule ? <Schedule/> : null }
                {this.state.history ? <Records/> : null }
            </React.Fragment>
        );
    }
}

export default Dashboard;

