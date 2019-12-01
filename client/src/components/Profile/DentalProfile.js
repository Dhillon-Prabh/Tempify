import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import './Profile.css'
import NewOfficeModal from './NewOfficeModal'
import MUIDatatable from "mui-datatables";
import SuccessAlert from "../Alert/SuccessAlert";
import FailAlert from '../Alert/FailAlert';

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
  labelAsterisk: {
    color: "#ff0000"
  },
  focused: {},
  outlinedInput: {
    "&$focused $notchedOutline": {
      border: "1px solid #00bfff"
    }
  },
  notchedOutline: {},
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  },
  dentalProfileTitleContainer: {
    marginTop: "120px"
  },
  dentalProfileTitle: {
    fontWeight: 800,
    fontSize: "26pt",
    display: "flex",
    justifyContent: "center",
    height: "80px",
    fontFamily: "Arial"
  },
  dentalProfileUpdateButton: {
    height: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
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

const columns = [
  {name:"name", label:"Name", className:"column"},
  {name:"officeEmail", label:"Email", className:"column"},
  {name:"officeName", label:"Office Name", className:"column"},
  {name:"action", label:"Action", className:"column"}
];

const options = {
  selectableRows: false,
  search: false,
  print: false,
  download: false,
  filter: false,
  column: false,
  pagination: false,
  viewColumns: false,
};

/**
 * 
 */
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: localStorage.getItem('userId'),
      officeId: this.props.officeId,
      groupId: this.props.groupId,
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
      data: [],
      setSuccessOpen: false,
      setFailOpen: false,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    console.log("mounting again");
    let currentComponent = this;
    var data = {
      groupId: this.state.groupId,
    }
    
    fetch("http://localhost:3001/dentalProfile", {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this.props.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res =>  {
      return res.json();
    }).then(result => {
      var resultData = [];
      for (var i = 0; i < result.length; i++) {
        let dName = result[i].dentist_name;
        let dOfficeEmail = result[i].email;
        let dOfficeName = result[i].office_name;
        let action;

        if (this.state.userId == result[i].user_id) {
          currentComponent.setState({
            name: result[i].dentist_name,
            officeEmail: result[i].email,
            officeName: result[i].office_name,
            phone: result[i].phone_number,
            streetNo: result[i].street_number,
            streetName: result[i].street_name,
            unit: result[i].unit_number,
            city: result[i].city,
            province: result[i].province,
            postalCode: result[i].postalcode,
            parking: result[i].parking_options,
          });
        } else {
          action = <Button className="select" onClick={currentComponent.handleClick.bind(currentComponent,[result[i]])}>Select</Button>;
        }
        
        let row = [];
        row.push(dName);
        row.push(dOfficeEmail);
        row.push(dOfficeName);
        row.push(action);
        resultData.push(row);        
      }
      currentComponent.setState({data: resultData});
      console.log(result);
    }).catch(function(err) {
      console.log(err);
    });
  }

  componentWillUnmount() {
    ValidatorForm.removeValidationRule("isPasswordMatch");
    ValidatorForm.removeValidationRule("isTruthy");
  }

  submitForm = event => {
    event.preventDefault();

    var data = {
      userId: this.state.userId,
      officeId: this.state.officeId,
      officeName: this.state.officeName,
      name: this.state.name,
      phone: this.state.phone,
      streetNo: this.state.streetNo,
      streetName: this.state.streetName,
      unit: this.state.unit,
      city: this.state.city,
      province: this.state.province,
      postalCode: this.state.postalCode,
      parking: this.state.parking
    };
    var self = this;
    fetch("http://localhost:3001/dentalUpdateProfile", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + this.props.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(function(response) {
        if (response.status == 401) {
          self.setState({ setFailOpen: true });
        } else {
          self.setState({ setSuccessOpen: true });
        }
        console.log(response);
      })
      .then(function(data) {
        console.log(data);
      })
      .catch(function(err) {
        console.log(err);
      });
      setTimeout(() =>{
        this.setState({
          setFailOpen: false,
          setSuccessOpen: false
        })
      }, 2000);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClick(acceptData) {
    console.log("handleClick");
    let currentComponent = this;
    var id = acceptData[0].user_id;
    console.log("id: " + id);
    
    if (localStorage.getItem('userId') != id) {
      localStorage.setItem('userId', id);
      console.log("userId updated");
    }
    window.location.reload();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="profile">
        <ValidatorForm ref="form" onSubmit={e => this.submitForm(e)}>
          <div className={classes.dentalProfileTitleContainer}>
            <div className={classes.dentalProfileTitle}>MY PROFILE</div>
          </div>


          <MUIDatatable 
            className="dental-profile-datatable"
            title={"Office List"}
            columns={columns}
            options={options}
            data={this.state.data}
          />

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
                validators={[
                  "required",
                  "minStringLength:10",
                  "minStringLength:10",
                  "isNumber"
                ]}
                errorMessages={[
                  "This field is required",
                  "Value should be 10 digits",
                  "Value should be 10 digits",
                  "Must be a number"
                ]}
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
                validators={["required"]}
                errorMessages={["This field is required"]}
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
              ></TextValidator>
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
                validators={["required"]}
                errorMessages={["This field is required"]}
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
              ></TextValidator>
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
                validators={["required"]}
                errorMessages={["This field is required"]}
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
                validators={["required"]}
                errorMessages={["This field is required"]}
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
              ></TextValidator>
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
                validators={["required"]}
                errorMessages={["This field is required"]}
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
              ></TextValidator>
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
                validators={["required"]}
                errorMessages={["This field is required"]}
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
              ></TextValidator>
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
                validators={["required"]}
                errorMessages={["This field is required"]}
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
                {parking.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextValidator>
            </Grid>
            <Grid item xs={12} direction="row" align="center">
              <Button className="blueButton" color="primary" variant="contained" type="submit">
                UPDATE DETAILS
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>
        <NewOfficeModal className="dental-profile-modal-blueButton"
          idType="blueButton"
          name="ADD NEW OFFICE"
          groupId={this.state.groupId}
          token={this.props.token}/>
        {this.state.setSuccessOpen ? <SuccessAlert type="profileUpdate" /> : null}
        {this.state.setFailOpen ? <FailAlert type="profileUpdate" /> : null}
      </div>
    );
  }
}

export default withStyles(useStyles)(Profile);
