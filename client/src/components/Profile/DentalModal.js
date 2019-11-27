import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import './DentalModal.css'

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

class DentalModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      officeId: this.props.officeId,
      email: '',
      password: '',
      confirmPassword: '',
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
      setOpen: false,
      open: false,
      link: this.props.link,
      groupId: this.props.groupId,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClickClose = this.handleClickClose.bind(this);
  }

  handleClickOpen = () => {
    this.setState({
      setOpen: true
    });
  };

  handleClickClose = () => {
    this.setState({
      setOpen: false
    });
  };

  renderButton(param) {

    switch(param) {
      case 'blueButton':
        return (
          <Button
            className="modal-blueButton"
            onClick={this.handleClickOpen}
          >
            {this.props.name}
          </Button>
        )
      case 'clearButton':
        return (
          <Button
          className="dental-modal-clearButton"
          onClick={this.handleClickOpen}
        >
          {this.props.name}
        </Button>
          )
      case 'typography':
        return (
          <Typography variant = "subheading" onClick={this.handleClickOpen}>
            {this.props.name}
          </Typography>);
      default: 
          console.log("error");
    }
  }

  componentDidMount() {
    let currentComponent = this;
    var data = {
      userId: this.state.userId,
      officeId: this.state.officeId,
      groupId: this.state.groupId,
    }
  }

  componentWillUnmount() {
    ValidatorForm.removeValidationRule('isPasswordMatch');
    ValidatorForm.removeValidationRule('isTruthy');
  }

  submitForm = () => {
    console.log("inside sufsf");

    var data = {
      userId: this.props.userId,
      officeId: this.props.officeId,
      email: this.state.email,
      password: this.state.password,
      officeName: this.state.officeName,
      name: this.state.name,
      phone: this.state.phone,
      streetNo: this.state.streetNo,
      streetName: this.state.streetName,
      unit: this.state.unit,
      city: this.state.city,
      province: this.state.province,
      postalCode: this.state.postalCode,
      parking: this.state.parking,
      groupId: this.state.groupId,
    }

    console.log(data);
    fetch("http://localhost:3001/dentalInsertProfile", {
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
    //this.setState({setOpen: false});//handleClickClose();
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="profile">
        {this.renderButton(this.props.idType)}

        <Dialog
          open={this.state.setOpen}
          keepMounted
          onClose={this.handleClickClose}
          maxWidth={'lg'}
          className="dental-modal-container1"
        >
          <DialogContent>
            <div className="dental-modal-container2"> 
              <ValidatorForm ref="form">
                <Typography align="center" className="dental-modal-header">
                  ADD NEW OFFICE
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
                        id="email"
                        name="email"
                        value={this.state.email}
                        label="Email Address"
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

                  <Grid item xs={12} align="center">
                    <Button className="dental-modal-blueButton" color="primary" variant="contained" type="submit" onClick={this.submitForm}>
                      ADD
                    </Button>
                    <Button className="dental-modal-blueButton" color="primary" variant="contained" onClick={this.handleClickClose}>
                      CLOSE
                    </Button>
                  </Grid>
                </Grid>
              </ValidatorForm>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(useStyles)(DentalModal);