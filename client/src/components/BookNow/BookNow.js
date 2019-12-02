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

/**
 * This component is used by the offices to book a new job.
 * @author Prabhdeep Singh
 * @version 1
 */

 /**
  * styles for this component
  * @param theme 
  */
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

/**
 * designations to choose from when booking a job
 */
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

/**
 * Posting gig component used to book a job.
 * @author Prabhdeep Singh
 * @version 1
 */
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

  /**
   * handles change to the form input values and changes the state
   */
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /**
   * handles the date input field and changes the state.
   */
  handleDateChange = date => {
    this.setState({ date: date });
  };

  /**
   * submitForm called when office submits the form. 
   * This is where we go to the databases.
   */
  submitForm = event => {
    var self = this;
    //set the errors to false by default.
    self.setState({
      dateError: false,
      timeError: false
    });
    event.preventDefault();
    // grabs userId from localStorage. Using token won't work because the office can change the profile on profile section.
    const userId = localStorage.getItem("userId");
    var data = {
      date: format(this.state.date, "yyyy-MM-dd"),
      time: this.state.fromTime + " - " + this.state.toTime,
      designation: this.state.designation,
      userId: userId
    };
    fetch("http://localhost:3001/postGig", {
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + this.props.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(function(response) {
        if (response.status == 422) {
        } else if (response.status == 300) { // no error
          self.setState({ success: true });
        }
        return response.json();
      })
      .then(function(data) {
        for (var i = 0; i < data.length; i++) {
          if (data[i].param == "date") { // express-validator returns the error after server validation
            console.log("date error");
            self.setState({ dateError: true }); // sets the date field error
          } else if (data[i].param == "time") {
            self.setState({ timeError: true }); // sets the time filed error
          }
        }
      })
      .catch(function(err) {
      });
  };

  render() {
    const classes = this.props.withStyles; // style classes
    return (
      <React.Fragment>
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

/**
 * This is for offices to find the right fit for them depending on the availablity entered by the temp.
 * This is not being used in the current version
 */
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

  const handleDateChange = date => {
    setValues(oldValues => ({
      ...oldValues,
      date: date
    }));
  };
  const handleChange = (event, index, value) => {
    setValues(oldValues => ({
      ...oldValues,
      designation: value
    }));
  };
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

/**
 * Booknow component used in the dashboard to show the feature.
 * @author Prabhdeep Singh
 * @version 1
 */
class BookNow extends React.Component {
  constructor(props) {
    super(props);
    
  }

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
