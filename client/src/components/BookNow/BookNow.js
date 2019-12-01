import React from "react";
import "./BookNow.css";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Divider from "@material-ui/core/Divider";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { format } from "date-fns";
import SuccessAlert from "../Alert/SuccessAlert";
import "./main.scss";

//
//
// Book Now lets the dental office finds a temp and book them
// Find the Right Fit portion of the code is currently not being used
//
//


// CSS for styling the components
const useStyles = theme => ({
  textField: {
    width: "100%",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  label: {
    "&$focused": {
      color: "#00bfff"
    }
  },
  inputlabel: {},
  labelAsterisk: {
    color: "#ff0000"
  },
  focused: {},
  outlinedInput: {
    "&$focused $notchedOutline": {
      border: "1px solid #00bfff"
    }
  },
  oulinedSelect: {
    border: "1px solid #00bfff"
  },
  notchedOutline: {},
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  },
  gigSelectorContainer: {
    height: "500px"
  }
});

const designations = [
  {
    value: "Assistant",
    label: "Assistant"
  },
  {
    value: "Registered Dental Hygienist",
    label: "Registered Dental Hygienist"
  },
  {
    value: "Receptionist",
    label: "Receptionist"
  }
];

//Sets the default booking values as states
class PostGig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      fromTime: "07:30",
      toTime: "17:00",
      designation: designations[0].value,
      dateError: false,
      timeError: false,
      success: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  //updates the state of name
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //update the state of date
  handleDateChange = date => {
    this.setState({ date: date });
  };

  // submits the form
  submitForm = event => {
    var self = this;
    self.setState({
      dateError: false,
      timeError: false
    });
    // prevents page from automatic reloading after form submission
    event.preventDefault();
    const userId = localStorage.getItem("userId");
    // prepares the data to be POST to database
    var data = {
      date: format(this.state.date, "yyyy-MM-dd"),
      time: this.state.fromTime + " - " + this.state.toTime,
      designation: this.state.designation,
      userId: userId
    };
    //makes a POST request to submit input informatoin to database
    fetch("http://localhost:3001/postGig", {
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + this.props.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    // callbacks to check if result of POST request
      .then(function(response) {
        if (response.status == 422) {
          console.log("validation error");
        } else if (response.status == 300) {
          self.setState({ success: true });
        }
        return response.json();
      })
      .then(function(data) {
        for (var i = 0; i < data.length; i++) {
          if (data[i].param == "date") {
            console.log("date error");
            self.setState({ dateError: true });
          } else if (data[i].param == "time") {
            self.setState({ timeError: true });
          }
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  // returns the compoenent for office to post a gig
  render() {
    const classes = this.props.withStyles;
    return (
      <React.Fragment>
        {/* Container to hold Post a Gig */}
        <Typography
          variant="h6"
          align="center"
          display="block"
          className="title"
        >
          POST A GIG
        </Typography>
        <ValidatorForm ref="form" onSubmit={e => this.submitForm(e)}>
          <div className="gigSelectorContainer">
            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="center"
              spacing={1}
            >
              <Grid item xs={12} md={2} width="80%">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                {/* Date picker to control user input */}
                  <KeyboardDatePicker
                    className="inputBox"
                    name="date"
                    disableToolbar
                    variant="inline"
                    inputVariant="outlined"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date"
                    value={this.state.date}
                    error={this.state.dateError}
                    onChange={this.handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date"
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} md={1}>
              {/* Validator for time input */}
                <TextValidator
                  label="From"
                  type="time"
                  name="fromTime"
                  validators={["required"]}
                  errorMessages={["This field is required"]}
                  onChange={this.handleChange}
                  value={this.state.fromTime}
                  error={this.state.timeError}
                  InputLabelProps={{
                    shrink: true
                  }}
                  inputProps={{
                    step: 900 // 15 min
                  }}
                />
              </Grid>
              <Grid item xs={12} md={1}>
              {/* Validator for time input */}
                <TextValidator
                  label="To"
                  type="time"
                  name="toTime"
                  validators={["required"]}
                  errorMessages={["This field is required"]}
                  onChange={this.handleChange}
                  value={this.state.toTime}
                  error={this.state.timeError}
                  InputLabelProps={{
                    shrink: true
                  }}
                  inputProps={{
                    step: 900 //15 min
                  }}
                />
              </Grid>
              <Grid item xs={12} md={2}>
              {/* Validator for input for temp designation */}
                <TextValidator
                  required
                  fullWidth
                  select
                  name="designation"
                  label="Designation"
                  validators={["required"]}
                  errorMessages={["This field is required"]}
                  margin="normal"
                  variant="outlined"
                  value={this.state.designation}
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true,
                    classes: {
                      root: classes.label,
                      focused: classes.focused,
                      asterisk: classes.labelAsterisk
                    }
                  }}
                  InputProps={{
                    classes: {
                      root: classes.outlinedInput,
                      focused: classes.focused,
                      notchedOutline: classes.notchedOutline
                    }
                  }}
                >
                  {designations.map(option => (
                    // Dropdown options for temp designation
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextValidator>
              </Grid>
                <Button className="button" type="submit">
                  POST A GIG
                </Button>
            </Grid>
          </div>
        </ValidatorForm>
        {this.state.success ? <SuccessAlert type="postGig" /> : null}
      </React.Fragment>
    );
  }
}

const FindFit = () => {
  const [values, setValues] = React.useState({
    date: new Date(),
    designation: ""
  });

  const inputLabel = React.useRef(null);

  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  // Update state of date
  const handleDateChange = date => {
    setValues(oldValues => ({
      ...oldValues,
      date: date
    }));
  };

  // Update state of designation
  const handleChange = (event, index, value) => {
    setValues(oldValues => ({
      ...oldValues,
      designation: value
    }));
  };

  // component that lets the office finds a specific temp to work with
  // this component is currently not in use
  return (
    <React.Fragment>
      <Typography variant="h6" align="center" display="block" className="title">
        FIND THE RIGHT FIT
      </Typography>
      <div className="fitSelectorContainer">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item xs={12} md={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {/* Date picker to control user input */}
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date"
                value={values.date}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} md={3}>
          {/* Form input options to control user input */}
            <FormControl variant="outlined" className="inputBox">
              <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                Designation
              </InputLabel>
              <Select
                value={values.designation}
                onChange={handleChange}
                labelWidth={labelWidth}
                inputProps={{
                  name: "Designation",
                  id: "outlined-age-simple"
                }}
              >
                <MenuItem value={1}>Assistant</MenuItem>
                <MenuItem value={2}>Registered Dental Hygienist</MenuItem>
                <MenuItem value={3}>Receptionist</MenuItem>
              </Select>
            </FormControl>
          </Grid>
            <Button className="button">SEARCH FOR TEMP</Button>
        </Grid>
      </div>
    </React.Fragment>
  );
};

class BookNow extends React.Component {
  constructor(props) {
    super(props);
    
  }

  // Return the post gig component 
  render() {
    return (
      <React.Fragment>
        <PostGig withStyles={useStyles} token = {this.props.token}/>
        <Divider/>
      </React.Fragment>
    )
  }
}

export default BookNow;
