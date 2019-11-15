import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import ListItemText from '@material-ui/core/ListItemText';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { Redirect } from 'react-router'
import './Profile.css'
import CheckboxValidatorElement from '../CheckboxValidatorElement/CheckboxValidatorElement';

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

class Profile extends React.Component {
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

    // fetch("http://localhost:3001/tempProfile")
    // .then(res => res.json())
    // .then(result => {
    //   this.setstate({name: result.temp_name})
    // });
    // ValidatorForm.addValidationRule('isTruthy', value => value);

    fetch('http://localhost:3001/tempProfile', {
      headers: {
        Authorization: 'Bearer ' + this.props.token
      }
    })
    .then(res=>{
      return res.json();
    })
    .then(result => {
      const currentUser = result.result[0];
      console.log(currentUser);
    })
    .catch(err => {
      if(err){
        console.log(err);
        throw err;
      }
    })
  }

  componentWillUnmount() {
    ValidatorForm.removeValidationRule('isPasswordMatch');
    ValidatorForm.removeValidationRule('isTruthy');
  }

  submitForm = (event) => {
    event.preventDefault();

    var data = {
      name: this.state.name,
      experience: this.state.experience,
      expectedRate: this.state.expectedRate,
      city: this.state.city,
      role: this.state.role,
      practice: this.state.practice,
      dentalsw: this.state.dentalsw,
      phone: this.state.phone,
    }
    fetch("http://localhost:3001/tempUpdateProfile", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(function(response) {
      console.log(response);
    }).then(function(data) {
      console.log(data);
    }).catch(function(err) {
      console.log(err);
    });
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
      <div className="register">
        <ValidatorForm ref="form" onSubmit={(e) => this.submitForm(e)}>
          <Typography align="center" className="header1">
            MY PROFILE
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
                fullWidth
                id="phone"
                name="phone"
                value={this.state.phone}
                label="Phone Number"
                className={classes.textField}
                margin="normal"
                variant="outlined"
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

            <Grid item xs={12} align="center">
              <Button className="blueButton" color="primary" variant="contained" type="submit">
                UPDATE DETAILS
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
    )
  }
}

export default withStyles(useStyles)(Profile);