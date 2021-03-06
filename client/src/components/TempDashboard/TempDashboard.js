import React, {Component} from 'react';
import Schedule from '../Schedule/scheduleForTemp';
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

class TempDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      pending: false,
      schedule: true,
      records: false,
    }

    this.navigatePending = this.navigatePending.bind(this);
    this.navigateSchedule = this.navigateSchedule.bind(this);
    this.navigateRecords = this.navigateRecords.bind(this);
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

    return(
      <div>
          <Grid container direction="row" justify="center" alignItems="center" className="options">
          <div className="tempDateboardOuterContainer">
            <Grid item xs={2}>
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
            <Grid item xs={4}>
            <div className="tempDashboardContainer">
              <ButtonGroup aria-label="small contained button group" className="buttons">
                  <Button className={this.state.pending ? "activeButton" : "tempButton"} onClick={this.navigatePending}>Pending</Button>
                  <Button className={this.state.schedule ? "activeButton" : "tempButton"} onClick={this.navigateSchedule}>Schedule</Button>
                  <Button className={this.state.records ? "activeButton" : "tempButton"} onClick={this.navigateRecords}>Records</Button>
              </ButtonGroup>
              </div>
            </Grid>
            </div>
          </Grid>

          {this.state.pending ? <Pending token = {this.props.token} /> : null }
          {this.state.schedule ? <Schedule token = {this.props.token}/> : null }
          {this.state.records ? <Records token = {this.props.token}/> : null }

      </div>
    ); 
  }
}

export default TempDashboard;
