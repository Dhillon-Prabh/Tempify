import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import {Redirect} from 'react-router-dom';
import SuccessAlert from '../Alert/SuccessAlert';
import FailAlert from "../Alert/FailAlert";

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
      minutes: '0',
      setSuccessOpen: false,
      setFailOpen: false
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  submitForm(e) {
    e.preventDefault();
    var minutes = this.state.minutes;
    minutes = parseInt(minutes) / 60;
    console.log(minutes);
    console.log(this.state.hour);
    var data = {
      bookingId: this.state.bookingId,
      hours: parseInt(this.state.hour) + minutes,
    }
    var self = this;
    fetch("/auth/addTime", {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this.props.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(function(response) {
      console.log(response);
      if (response.status == 200) {
        self.setState({ setSuccessOpen: true });
      } else {
        self.setState({ setFailOpen: true });
      }
    }).then(function(data) {
      console.log(data);
    }).catch(function(err) {
        console.log(err);
    });
    setTimeout(() =>{
      this.setState({
        setFailOpen: false,
        setSuccessOpen: false
      });
      window.location.reload();
    }, 2000);
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
        {this.state.setSuccessOpen ? <SuccessAlert type="addTime" /> : null}
        {this.state.setFailOpen ? <FailAlert type="addTime" /> : null}
      </form>
    );
  }
}

export default withStyles(useStyles)(BasicTextFields);