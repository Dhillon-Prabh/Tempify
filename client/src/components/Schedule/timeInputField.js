import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import {Redirect} from 'react-router-dom';

const useStyles = theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
      backgroundColor: "white",
      marginTop: "12px",
      display: "flex",
      flexDirection: "column",
      marginLeft: "25px"
    },
  },
  button: {
    backgroundColor: "#00BFFF !important",
  }
});

class BasicTextFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingId: this.props.bookingId,
      hour: '0',
      minutes: '0'
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  submitForm(e) {
    e.preventDefault();
    console.log("sending hours");
    var minutes = this.state.minutes;
    minutes = parseInt(minutes) / 60;
    console.log(minutes);
    console.log(this.state.hour);
    var data = {
      bookingId: this.state.bookingId,
      hours: parseInt(this.state.hour) + minutes,
    }
    fetch("http://localhost:3001/addTime", {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this.props.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(function(response) {
      
      if (response.status == 200) {
        window.location.reload();
      }
    }).then(function(data) {
      console.log(data);
    }).catch(function(err) {
        console.log(err);
    });
    return <Redirect to='/tempdashboard' />
  }

  render() { 
    const { classes } = this.props;
    return (
      <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => this.submitForm(e)}>
        <TextField id="standard-basic" name="hour" value={this.state.hour} onChange={this.handleChange} label="Hour" />
        <TextField id="standard-basic" name="minutes" value={this.state.minutes} onChange={this.handleChange} label="Minute" />
        <Button variant="contained" color="primary" className={classes.button} type="submit">
          Request Payment
        </Button>
      </form>
    );
  }
}

export default withStyles(useStyles)(BasicTextFields);