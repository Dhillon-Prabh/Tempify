import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import './Profile.css'
import DentalModal from './DentalModal'

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

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      officeId: this.props.officeId,
      officeEmail: '',
      officeName: '',
      name: '',
      phone: '',
      streetNo: '',
      streetName: '',
      unit: '',
      city: '',
      province: '',
      postalCode: '',
      parking: parking[0].value,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    let currentComponent = this;
    var data = {
      userId: this.state.userId,
      officeId: this.state.officeId
    }
    
    fetch("http://localhost:3001/dentalProfile", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(function(response) {
      console.log(response);
      return response.json();
    }).then(function(data) {
      console.log(data);
      currentComponent.setState({
        name: data[0].dentist_name,
        officeEmail: data[0].email,
        officeName: data[0].office_name,
        phone: data[0].phone_number,
        streetNo: data[0].street_number,
        streetName: data[0].street_name,
        unit: data[0].unit_number,
        city: data[0].city,
        province: data[0].province,
        postalCode: data[0].postalcode,
        parking: data[0].parking_options,
      });
    }).catch(function(err) {
      console.log(err);
    });
  }

  componentWillUnmount() {
    ValidatorForm.removeValidationRule('isPasswordMatch');
    ValidatorForm.removeValidationRule('isTruthy');
  }

  submitForm = (event) => {
    event.preventDefault();

    var data = {
      userId: this.props.userId,
      officeId: this.props.officeId,
      officeEmail: this.state.officeEmail,
      officeName: this.state.OfficeName,
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

    fetch("http://localhost:3001/dentalUpdateProfile", {
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
    this.props.history.push("/home");
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {

    const { classes } = this.props;
    return (
      <div className="profile">
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
                //autoComplete="name"
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
                id="officeEmail"
                name="officeEmail"
                value={this.state.officeEmail}
                label="Office Email Address"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                //autoComplete="email"
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
                id="officeName"
                name="officeName"
                value={this.state.officeName}
                label="Office Name"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                //autoComplete="name"
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
                label="phone"
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

            <Grid item xs={12} className="container2">
              <Button className="blueButton" color="primary" variant="contained" type="submit">
                UPDATE DETAILS
              </Button>
              <DentalModal className="blueButton" idType="blueButton" name="ADD NEW OFFICE"/>
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
    )
  }
}

export default withStyles(useStyles)(Profile);