import React, {Component} from 'react';
import Schedule from '../Schedule/schedule';
import {Link} from 'react-router-dom';
import './TempDashboard.css'

import SvgIcon from '@material-ui/core/SvgIcon';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Pending from '../Pending/Pending';
import Records from '../Records/Records';

const styles = theme => ({
  
  submit: {
    backgroundColor: "#00bfff",
    display: 'block',
    height: '4em',
    '&:hover': {
      background: "#404040",
    },
    '&:focused': {
      background: "#404040",
    }
  },
  label: {
    '&$focused': {
      color: '#00bfff'
    },
  },
  focused: {
    background: "#404040",
  },
  outlinedInput: {
    '&$focused $notchedOutline': {
      border: '1px solid #00bfff'
    },
  },
  notchedOutline: {},
});

class TempDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      pending: false,
      schedule: false,
      records: false,
    }

    this.navigatePending = this.navigatePending.bind(this);
    this.navigateSchedule = this.navigateSchedule.bind(this);
    this.navigateRecords = this.navigateRecords.bind(this);
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
        schedule: true
      });
    }).catch(function(err) {
      console.log(err);
    });
  }

  navigatePending() {
    this.setState({
      pending: true,
      schedule: false,
      records: false
    })
  }

  navigateSchedule() {
    this.setState({
      pending: false,
      schedule: true,
      records: false
    })
  }

  navigateRecords() {
    this.setState({
      pending: false,
      schedule: false,
      records: true
    })
  }

  render(){

    const { classes } = this.props;
    return(
      <div>
          <Grid container direction="row" justify="center" alignItems="center" className="options">
            <Grid item xs={12} md={3}>
              <Grid item xs={12}>
                <div className = "tempdashboard-username">
                  Hi, {this.state.user}!
                </div>
              </Grid>
              <Breadcrumbs aria-label="breadcrumb">
                  <Link to="/tempdashboard" style={{textDecoration:'none', color: 'inherit'}}>
                  <ListItem button>
                    <ListItemIcon>
                      <SvgIcon >
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                      </SvgIcon>
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItem>
                  </Link>
                  <Typography color="textPrimary">dashboard</Typography>
                </Breadcrumbs>
            </Grid>
            <Grid item xs={12} md={3}>
              <ButtonGroup fullWidth aria-label="full width outlined button group" className="buttons">
                  <Button 
                    type="submit" 
                    fullWidth variant="contained" 
                    color="primary" 
                    className={classes.submit}
                    onClick={this.navigatePending}
                    >
                      Pending
                    </Button>
                    <Button 
                    type="submit" 
                    fullWidth variant="contained" 
                    color="primary" 
                    className={classes.submit}
                    onClick={this.navigateSchedule}
                    >
                      Schedule
                    </Button>
                    <Button 
                    type="submit" 
                    fullWidth variant="contained" 
                    color="primary" 
                    className={classes.submit}
                    onClick={this.navigateRecords}
                    >
                      Records
                    </Button>
              </ButtonGroup>
            </Grid>
          </Grid>

          {this.state.pending ? <Pending/> : null }
          {this.state.schedule ? <Schedule/> : null }
          {this.state.records ? <Records/> : null }

      </div>
    ); 
  }
}

export default withStyles(styles, { withTheme: true })(TempDashboard);