import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { Link, Route } from "react-router-dom";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import './Register.css'
import CheckboxValidatorElement from '../CheckboxValidatorElement/CheckboxValidatorElement';
import ContactSection from '../Contact/ContactSection';
import TermsAndConditions from '../Terms/TermsAndConditions';
import SuccessAlert from '../Alert/SuccessAlert';
import FailAlert from '../Alert/FailAlert';

/**
 * This is where the offices register themselves. 
 * @author Prabhdeep Singh 
 * @author John Ham
 * @version 1.0
 */

/**
 * styles used by this component
 * @param theme 
 */

const useStyles = theme => ({
  textField: {
    width: '100%',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  label: {
    '&$focused': {
      color: '#00bfff'
    },
  },
  labelAsterisk: {
    color: '#ff0000'
  },
  focused: {},
  outlinedInput: {
    '&$focused $notchedOutline': {
      border: '1px solid #00bfff'
    },
  },
  notchedOutline: {},
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
});

/**
 * parking options 
 */
const parking = [
  {
    value: 'yes',
    label: 'Free',
  },
  {
    value: 'paid',
    label: 'Paid/Street',
  },
  {
    value: 'no',
    label: 'No Parking',
  },
];

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      officeName: '',
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      phone: '',
      streetNo: '',
      streetName: '',
      unit: '',
      city: '',
      province: '',
      postalCode: '',
      parking: parking[0].value,
      setSuccessOpen: false,
      setFailOpen: false,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * extra validations for this component
   */
  componentDidMount() {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if(value !== this.state.password) {
        return false;
      } 
      return true;
    });
    ValidatorForm.addValidationRule('isTruthy', value => value);
  }

  componentWillUnmount() {
    ValidatorForm.removeValidationRule('isPasswordMatch');
    ValidatorForm.removeValidationRule('isTruthy');
  }

  /**
   * goes to the backend and adds new user after server side validation.
   */
  submitForm = (event) => {
    event.preventDefault();

    var data = {
        officeName: this.state.officeName,
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
        phone: this.state.phone,
        streetNo: this.state.streetNo,
        streetName: this.state.streetName,
        unit: this.state.unit,
        city: this.state.city,
        province: this.state.province,
        postalCode: this.state.postalCode,
        parking: this.state.parking,
    }
    var self = this;
    fetch("http://localhost:3001/dentalRegister", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(function(response) {
      console.log(response);
      if (response.status == 401) {
        self.setState({ setFailOpen: true });
      } else {
        self.setState({ setSuccessOpen: true });
      }
      console.log("STATUS" , response.status == 401);
    }).then(function(data) {
      console.log(data);
    }).catch(function(err) {
        console.log(err);
    });
    setTimeout(() =>{
      this.setState({ setFailOpen: false, setSuccessOpen: false });
      this.props.history.push("/");
    }, 2000);
  }

  /**
   * handles state change here
   */
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  /**
   * handlles checkbox click event
   */
  handleCheckboxChange = (e) => {
    this.setState({accept: e.target.checked})
  }

  render() {

    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className="register">
          <ValidatorForm ref="form" onSubmit={(e) => this.submitForm(e)}>
            <Typography align="center" className="header1">
              DENTAL OFFICE REGISTRATION
            </Typography>

            <Grid container spacing={6} className="container1">
              <Grid item xs={12} sm={6} className="container2">
                <TextValidator
                  required
                  fullWidth
                  id="officeName"
                  name="officeName"
                  value={this.state.officeName}
                  label="Office Name"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  autoComplete="name"
                  validators={['required']}
                  errorMessages={['This field is required']}
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true,
                    classes: {
                      root: classes.label,
                      focused: classes.focused,
                      asterisk: classes.labelAsterisk,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.outlinedInput,
                      focused: classes.focused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} className="container2">
                <TextValidator
                  required
                  fullWidth
                  id="email"
                  name="email"
                  value={this.state.email}
                  label="Email address"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  autoComplete="email"
                  validators={['required', 'isEmail']}
                  errorMessages={['This field is required', 'This is not a valid email']}
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true,
                    classes: {
                      root: classes.label,
                      focused: classes.focused,
                      asterisk: classes.labelAsterisk,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.outlinedInput,
                      focused: classes.focused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} className="container2">
                <TextValidator
                  required
                  fullWidth
                  id="password"
                  name="password"
                  value={this.state.password}
                  type="password"
                  label="Password"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  validators={['required']}
                  errorMessages={['This field is required']}
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true,
                    classes: {
                      root: classes.label,
                      focused: classes.focused,
                      asterisk: classes.labelAsterisk,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.outlinedInput,
                      focused: classes.focused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} className="container2">
                <TextValidator
                  required
                  fullWidth
                  id="confirmPassword"
                  name="confirmPassword"
                  value={this.state.confirmPassword}
                  type="password"
                  label="Confirm password"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  validators={['required', 'isPasswordMatch']}
                  errorMessages={['This field is required', 'Passwords do not match']}
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true,
                    classes: {
                      root: classes.label,
                      focused: classes.focused,
                      asterisk: classes.labelAsterisk,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.outlinedInput,
                      focused: classes.focused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} className="container2">
                <TextValidator
                  required
                  fullWidth
                  id="name"
                  name="name"
                  value={this.state.name}
                  label="Your name"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  autoComplete="name"
                  validators={['required']}
                  errorMessages={['This field is required']}
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true,
                    classes: {
                      root: classes.label,
                      focused: classes.focused,
                      asterisk: classes.labelAsterisk,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.outlinedInput,
                      focused: classes.focused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} className="container2">
                <TextValidator
                  required
                  fullWidth
                  id="phone"
                  name="phone"
                  label="Phone"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  value={this.state.phone}
                  validators={['required', 'minStringLength:10', 'minStringLength:10', 'isNumber']}
                  errorMessages={['This field is required', 'Value should be 10 digits', 'Value should be 10 digits', 'Must be a number']}
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true,
                    classes: {
                      root: classes.label,
                      focused: classes.focused,
                      asterisk: classes.labelAsterisk,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.outlinedInput,
                      focused: classes.focused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6} className="container2">
                <TextValidator
                  required
                  fullWidth
                  id="streetNo"
                  name="streetNo"
                  label="Street Number"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  defaultValue="none"
                  value={this.state.streetNo}
                  validators={['required']}
                  errorMessages={['This field is required']}
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true,
                    classes: {
                      root: classes.label,
                      focused: classes.focused,
                      asterisk: classes.labelAsterisk,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.outlinedInput,
                      focused: classes.focused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                >
                </TextValidator>
              </Grid>
              <Grid item xs={12} sm={6} className="container2">
                <TextValidator
                  required
                  fullWidth
                  id="streetName"
                  name="streetName"
                  label="Street Name"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  defaultValue="none"
                  value={this.state.streetName}
                  validators={['required']}
                  errorMessages={['This field is required']}
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true,
                    classes: {
                      root: classes.label,
                      focused: classes.focused,
                      asterisk: classes.labelAsterisk,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.outlinedInput,
                      focused: classes.focused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                >
                </TextValidator>
              </Grid>

              <Grid item xs={12} sm={6} className="container2">
                <TextValidator
                  required
                  fullWidth
                  id="unit"
                  name="unit"
                  value={this.state.unit}
                  label="Unit"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  validators={['required']}
                  errorMessages={['This field is required']}
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true,
                    classes: {
                      root: classes.label,
                      focused: classes.focused,
                      asterisk: classes.labelAsterisk,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.outlinedInput,
                      focused: classes.focused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} className="container2">
                <TextValidator
                  required
                  fullWidth
                  id="city"
                  name="city"
                  label="City"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  defaultValue="none"
                  value={this.state.city}
                  validators={['required']}
                  errorMessages={['This field is required']}
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true,
                    classes: {
                      root: classes.label,
                      focused: classes.focused,
                      asterisk: classes.labelAsterisk,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.outlinedInput,
                      focused: classes.focused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                >
                </TextValidator>
              </Grid>

              <Grid item xs={12} sm={6} className="container2">
                <TextValidator
                  required
                  fullWidth
                  id="province"
                  name="province"
                  label="Province"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  defaultValue="none"
                  value={this.state.province}
                  validators={['required']}
                  errorMessages={['This field is required']}
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true,
                    classes: {
                      root: classes.label,
                      focused: classes.focused,
                      asterisk: classes.labelAsterisk,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.outlinedInput,
                      focused: classes.focused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                >
                </TextValidator>
                </Grid>
                <Grid item xs={12} sm={6} className="container2">
                <TextValidator
                  required
                  fullWidth
                  id="postalCode"
                  name="postalCode"
                  label="Postal Code"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  defaultValue="none"
                  value={this.state.postalCode}
                  validators={['required']}
                  errorMessages={['This field is required']}
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true,
                    classes: {
                      root: classes.label,
                      focused: classes.focused,
                      asterisk: classes.labelAsterisk,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.outlinedInput,
                      focused: classes.focused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                >
                </TextValidator>
              </Grid>
              <Grid item xs={12} sm={6} className="container2">
                <TextValidator
                  required
                  fullWidth
                  select
                  id="parking"
                  name="parking"
                  label="Parking"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  defaultValue="none"
                  value={this.state.parking}
                  validators={['required']}
                  errorMessages={['This field is required']}
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true,
                    classes: {
                      root: classes.label,
                      focused: classes.focused,
                      asterisk: classes.labelAsterisk,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.outlinedInput,
                      focused: classes.focused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                >
                {parking.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
                </TextValidator>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={<CheckboxValidatorElement color="primary" name="accept" validators={['isTruthy']}
                  errorMessages={['This field is required']}
                  onChange={this.handleCheckboxChange}
                  checked={this.state.accept}
                  value={this.state.accept} />}
                  label="I Accept"
                />
                <nav>
                  <Link
                    variant="body2"
                    to="/termsAndConditions"
                    >
                    Terms and Conditions
                  </Link>
                </nav>
                <Route
                  path="/termsAndConditions"
                  component={TermsAndConditions}
                />
              </Grid>
              <Grid item xs={12} align="center">
                <Button className="blueButton" color="primary" variant="contained" type="submit">
                  SUBMIT FORM
                </Button>
              </Grid>
            </Grid>
          </ValidatorForm>
        </div>
        {this.state.setSuccessOpen ? <SuccessAlert type="register" /> : null}
        {this.state.setFailOpen ? <FailAlert type="register" /> : null}
        <ContactSection/>
      </React.Fragment>
    )
  }
}

export default withStyles(useStyles)(Register);