import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import ListItemText from '@material-ui/core/ListItemText';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox'
import './Register.css'
import CheckboxValidatorElement from '../CheckboxValidatorElement/CheckboxValidatorElement';
import ContactSection from '../Contact/ContactSection'

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
  inputlabel: {},
  labelAsterisk: {
    color: '#ff0000'
  },
  focused: {},
  outlinedInput: {
    '&$focused $notchedOutline': {
      border: '1px solid #00bfff'
    },
  },
  oulinedSelect: {
    border: '1px solid #00bfff'
  },
  notchedOutline: {},
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
});

const city = [
  {
    value: 'Vancouver',
    label: 'Vancouver',
  },
  {
    value: 'North Vancouver',
    label: 'North Vancouver',
  },
  {
    value: 'New Westminster',
    label: 'New Westminster',
  },
  {
    value: 'Tri-Cities',
    label: 'Tri-Cities',
  },
  {
    value: 'Surrey',
    label: 'Surrey',
  },
  {
    value: 'Richmond',
    label: 'Richmond',
  },
  {
    value: 'White Rock',
    label: 'White Rock',
  },
  {
    value: 'Langley(Fraser Valley)',
    label: 'Langley(Fraser Valley)',
  },
];

const role = [
  {
    value: 'Assistant',
    label: 'Assistant',
  },
  {
    value: 'Registered Dental Hygienist',
    label: 'Registered Dental Hygienist',
  },
  {
    value: 'Receptionist',
    label: 'Receptionist',
  },
];

const practice = [
  {
    value: 'General',
    label: 'General',
  },
  {
    value: 'Ortho',
    label: 'Ortho',
  },
  {
    value: 'Endo',
    label: 'Endo',
  },
  {
    value: 'Pedo',
    label: 'Pedo',
  },
  {
    value: 'Oral Surgery',
    label: 'Oral Surgery',
  },
];

const dentalsw = [
  {
    value: 'Dentrix',
    label: 'Dentrix',
  },
  {
    value: 'Cleardent',
    label: 'Cleardent',
  },
  {
    value: 'Tracker',
    label: 'Tracker',
  },
  {
    value: 'Other',
    label: 'Other',
  },
  {
    value: 'None',
    label: 'None',
  },
];

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      experience: '',
      expectedRate: '',
      city: city[0].value,
      role: [],
      license: '',
      practice: practice[0].value,
      dentalsw: [],
      accept: false,
    }
    this.handleChange = this.handleChange.bind(this);
  }

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

  submitForm = (event) => {
    event.preventDefault();

    var data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      experience: this.state.experience,
      expectedRate: this.state.expectedRate,
      city: this.state.city,
      role: this.state.role,
      license: this.state.license,
      practice: this.state.practice,
      dentalsw: this.state.dentalsw
    }
    fetch("http://localhost:3001/tempRegister", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(function(response) {
      if (response.status === 401) {
        console.log("this user already exists");
      }
      console.log(response);
    }).then(function(data) {
      console.log(data);
    }).catch(function(err) {
      console.log(err);
    });
    this.props.history.push("/");
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

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
              TEMP REGISTRATION
            </Typography>
            <Typography align="center" style={{color: 'red'}}>
              {this.state.error}
            </Typography>
            <Grid container spacing={6} className="container1">
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
                  id="experience"
                  name="experience"
                  type="number"
                  label="Years of experience"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  value={this.state.experience}
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
                  id="expRate"
                  name="expectedRate"
                  label="Expected rate [$]"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  value={this.state.expectedRate}
                  validators={['required', 'minNumber:20', 'maxNumber:60']}
                  errorMessages={['This field is required', 'Value should be between 20 and 60', 'Value should be between 20 and 60']}
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
                  select
                  id="city"
                  name="city"
                  label="Select city"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
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
                  {city.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextValidator>
              </Grid>
              <Grid item xs={12} sm={6} className="container2">
                <InputLabel shrink={true}
                  classes={{
                    root: classes.inputlabel,
                    focused: classes.focused,
                    asterisk: classes.labelAsterisk,
                  }}
                >
                  What do you do? <span className="temp-register-asterisk">*</span>
                </InputLabel>
                <Select
                  required
                  multiple
                  fullWidth
                  id="role"
                  name="role"
                  value={this.state.role}
                  className={classes.textField}
                  input={<OutlinedInput
                    classes={{
                      root: classes.outlinedInput,
                      focused: classes.focused,
                      notchedOutline: classes.notchedOutline,
                    }}
                  />}
                  renderValue={selected => selected.join(', ')}
                  onChange={this.handleChange}
                >
                  {role.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      <Checkbox checked={this.state.role.indexOf(option.value) > -1} />
                      <ListItemText primary={option.label} />
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid item xs={12} sm={6} className="container2">
                <TextValidator
                  required
                  fullWidth
                  id="license"
                  name="license"
                  value={this.state.license}
                  label="License number"
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
                  select
                  id="practice"
                  name="practice"
                  label="practice"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  defaultValue="none"
                  value={this.state.practice}
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
                  {practice.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextValidator>
              </Grid>

              <Grid item xs={12} sm={6} className="container2">
                <InputLabel shrink={true}
                  classes={{
                    root: classes.inputlabel,
                    focused: classes.focused,
                    asterisk: classes.labelAsterisk,
                  }}
                >
                  Dental Software Used <span className="temp-register-asterisk">*</span>
                </InputLabel>
                <Select
                  required
                  multiple
                  fullWidth
                  id="dentalsw"
                  name="dentalsw"
                  value={this.state.dentalsw}
                  className={classes.textField}
                  input={<OutlinedInput
                    classes={{
                      root: classes.outlinedInput,
                      focused: classes.focused,
                      notchedOutline: classes.notchedOutline,
                    }}
                  />}
                  renderValue={selected => selected.join(', ')}
                  onChange={this.handleChange}
                >
                  {dentalsw.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      <Checkbox checked={this.state.dentalsw.indexOf(option.value) > -1} />
                      <ListItemText primary={option.label} />
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} sm={6} className="container2">
                <input
                  accept="./image/*"
                  id="image-upload"
                  multiple
                  type="file"
                  className="temp-register-upload"
                />
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
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    alert("Hi, I'm Terms and conditions.");
                  }}>
                  Terms and Conditions
                </Link>
              </Grid>
              <Grid item xs={12} align="center">
                <Button className="blueButton" color="primary" variant="contained" type="submit">
                  SUBMIT FORM
                </Button>
              </Grid>
            </Grid>
          </ValidatorForm>
        </div>
        <ContactSection/>
      </React.Fragment>
    )
  }
}

export default withStyles(useStyles)(Register);