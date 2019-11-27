import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "./paymentRequestButton";

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
});

class BasicTextFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: '',
      minutes: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  render() { 
    const { classes } = this.props;
  return (
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="standard-basic" name="hour" value={this.state.hour} onChange={this.handleChange} label="Hour" />
        <TextField id="standard-basic" name="minutes" value={this.state.minutes} onChange={this.handleChange} label="Minute" />
        <Button />
      </form>
    );
  }
}

export default withStyles(useStyles)(BasicTextFields);