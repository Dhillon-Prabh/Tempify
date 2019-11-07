import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
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
      exp: '',
      city: city[0].value,
      youdo: '',
      practice: '',
      dentalsw: '',
    }
  }

  handleExpChange = (changeEvent) => {
    this.setState({
      exp: changeEvent.target.value
    });
  }

  handleCityChange = (changeEvent) => {
    this.setState({
      city: changeEvent.target.value
    });
  }

  handleYoudoChange = (changeEvent) => {
    this.setState({
      youdo: changeEvent.target.value
    });
  }

  handlePracticeChange = (changeEvent) => {
    this.setState({
      practice: changeEvent.target.value
    });
  }

  handleDentalSWChange = (changeEvent) => {
    this.setState({
      dentalsw: changeEvent.target.value
    });
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
                label="Your name"
                //placeholder="Your name?"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                autoComplete="name"
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
                label="Email address"
                //placeholder="Email address"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                autoComplete="email"
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
                type="password"
                label="Password"
                //placeholder="Password"
                className={classes.textField}
                margin="normal"
                variant="outlined"
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
                type="password"
                label="Confirm password"
                //placeholder="Confirm password"
                className={classes.textField}
                margin="normal"
                variant="outlined"
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
                label="Years of experience"
                //placeholder="Years of experience"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={this.state.exp}
                onChange={(e) => {this.handleExpChange(e);}}
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
                name="expRate"
                label="Expected rate [$]"
                //placeholder="Expected rate [$]"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={this.state.exp}
                onChange={(e) => {this.handleExpChange(e);}}
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
                label="Select city"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                defaultValue="none"
                value={this.state.city}
                onChange={(e) => {this.handleCityChange(e);}}
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
                onChange={(e) => {this.handleYoudoChange(e);}}
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
                label="Required"
                placeholder="License number?"
                className={classes.textField}
                margin="normal"
                variant="outlined"
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
                onChange={(e) => {this.handlePracticeChange(e);}}
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
                onChange={(e) => {this.handleDentalSWChange(e);}}
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
              <Button className="blueButton" color="primary" variant="contained">
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