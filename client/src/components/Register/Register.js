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
import './Register.css'

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

const city = [
  {
    value: 'none',
    label: '- Select city? -',
    disabled: 'true',
  },
  {
    value: 'Vancouver',
    label: 'Vancouver',
  },
  {
    value: 'North Vancouver',
    label: 'North Vancouver',
  },
  {
    value: 'Burnaby',
    label: 'Burnaby',
  },
];

const youdo = [
  {
    value: 'none',
    label: '- What do you do? -',
  },
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
    value: 'none',
    label: '- Type of Practice? -',
    disabled: 'true',
  },
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
];

const dentalsw = [
  {
    value: 'none',
    label: '- Dental Software Used -',
    disabled: 'true',
  },
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
      city: '',
      youdo: '',
      license: '',
      practice: '',
      dentalsw: '',
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleConfirmPassword = (event) => {
    this.setState({confirmPassword: event.target.value});
    if (event.target.value !== this.state.password) {
      console.log("This is an error");
    }
  }

  submitForm = (event) => {
    event.preventdefault();
    var data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      experience: this.state.experience,
      expectedRate: this.state.expectedRate,
      city: this.state.city,
      youdo: this.state.youdo,
      license: this.state.license,
      practice: this.state.practice,
      dentalsw: this.state.dentalsw
    }
    console.log(data);
    fetch("/register", {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(function(response) {

    }).then(function(data) {
      console.log(data)
      if (data == "success") {
        console.log("success it is")
      }
    }).catch(function(err) {
        console.log(err);
    });
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="register">
        <React.Fragment>

          <Typography align="center" className="header1">
            TEMP REGISTRATION
          </Typography>

          <Grid container spacing={6} className="container1">
            <Grid item xs={12} sm={6} className="container2">
              <TextField
                required
                fullWidth
                id="name"
                name="name"
                value={this.state.name}
                label="Required"
                placeholder="Your name?"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                autoComplete="name"
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
              <TextField
                required
                fullWidth
                id="email"
                name="email"
                value={this.state.email}
                label="Required"
                placeholder="Email address"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                autoComplete="email"
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
              <TextField
                required
                fullWidth
                id="password"
                name="password"
                value={this.state.password}
                type="password"
                label="Required"
                placeholder="Password"
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
              <TextField
                required
                fullWidth
                id="cPassword"
                name="cPassword"
                value={this.state.confirmPassword}
                type="password"
                label="Required"
                placeholder="Confirm password"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                onChange={(e) => {this.handleConfirmPassword(e);}}
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
              <TextField
                required
                fullWidth
                id="experience"
                name="experience"
                type="number"
                label="Required"
                placeholder="Years of experience"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={this.state.exp}
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
              <TextField
                required
                fullWidth
                id="expRate"
                name="expectedRate"
                label="Required"
                placeholder="Expected rate [$]"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={this.state.expectedRate}
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
              <TextField
                required
                fullWidth
                select
                id="city"
                name="city"
                label="Required"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                defaultValue="none"
                value={this.state.city}
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
                  <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} className="container2">
              <TextField
                required
                fullWidth
                select
                id="youdo"
                name="youdo"
                label="Required"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                defaultValue="none"
                value={this.state.youdo}
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
                {youdo.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} className="container2">
              <TextField
                required
                fullWidth
                id="license"
                name="license"
                value={this.state.license}
                label="Required"
                placeholder="License number?"
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
              <TextField
                required
                fullWidth
                select
                id="practice"
                name="practice"
                label="Required"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                defaultValue="none"
                value={this.state.practice}
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
                  <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} className="container2">
              <TextField
                required
                fullWidth
                select
                id="dentalsw"
                name="dentalsw"
                label="Required"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                defaultValue="none"
                value={this.state.dentalsw}
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
                {dentalsw.map(option => (
                  <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} className="container2">
              <input
                accept="./image/*"
                id="image-upload"
                multiple
                type="file"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
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
              <Button className="blueButton" color="primary" variant="contained" onClick={(e) => {this.submitForm(e);}}>
                SUBMIT FORM
              </Button>
            </Grid>
          </Grid>
        </React.Fragment>
      </div>
    )
  }
}

export default withStyles(useStyles)(Register);