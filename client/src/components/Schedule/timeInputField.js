import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SuccessAlert from "../Alert/SuccessAlert";
import FailAlert from "../Alert/FailAlert";

/**
 *
 * This is the component for temp's hour input to request payment
 *
 * @author Prabdeep Singh
 * @author Oscar Au 
 * @author John Ham
 * @version 1.2
 *
 */

/**
 * CSS styling for the component
 */
const useStyles = theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200,
      backgroundColor: "white",
      marginTop: "12px",
      display: "flex",
      flexDirection: "column",
      marginLeft: "25px"
    }
  },
  button: {
    backgroundColor: "#00BFFF !important"
  }
});

/**
 * Sets the initial state of the component
 */
class BasicTextFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingId: this.props.bookingId,
      hour: "0",
      minutes: "0",
      setSuccessOpen: false,
      setFailOpen: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Sets the state of the component upon request payment
   */
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /**
   * Submits the form and write to the database
   */
  submitForm(e) {
    e.preventDefault();
    var minutes = this.state.minutes;
    minutes = parseInt(minutes) / 60;
    var data = {
      bookingId: this.state.bookingId,
      hours: parseInt(this.state.hour) + minutes
    };
    var self = this;
    fetch("http://localhost:3001/addTime", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + this.props.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(function(response) {
      if (response.status === 200) {
        self.setState({ setSuccessOpen: true });
      } else {
        self.setState({ setFailOpen: true });
      }
    }).then(function(data) {
    }).catch(function(err) {
    });
    setTimeout(() =>{
      this.setState({
        setFailOpen: false,
        setSuccessOpen: false
      });
      window.location.reload();
    }, 2000);
  }

  /**
   * Returns the time log component which takes temp inputs
   * Returns success alert if input success
   */
  render() {
    const { classes } = this.props;
    return (
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={e => this.submitForm(e)}
      >
        <TextField
          id="standard-basic"
          name="hour"
          value={this.state.hour}
          onChange={this.handleChange}
          label="Hour"
        />
        <TextField
          id="standard-basic"
          name="minutes"
          value={this.state.minutes}
          onChange={this.handleChange}
          label="Minute"
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          type="submit"
        >
          Request Payment
        </Button>
        {this.state.setSuccessOpen ? <SuccessAlert type="addTime" /> : null}
        {this.state.setFailOpen ? <FailAlert type="addTime" /> : null}
      </form>
    );
  }
}

export default withStyles(useStyles)(BasicTextFields);
