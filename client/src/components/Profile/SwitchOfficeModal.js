import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MUIDatatable from "mui-datatables";
import './OfficeModal.css'

/**
 * Styling for the material UI components. 
 * @param {const} theme 
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
};

/**
 * Modal component for showing different offices in the profile
 * for users to switch to. 
 * @author Ho Joo Lee
 * @version 1.0 
 */
class SwitchOfficeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      data: [],
      setOpen: false,
      open: false,
      link: this.props.link,
      groupId: this.props.groupId,
      success: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClickClose = this.handleClickClose.bind(this);
  }

  /**
   * Opens the modal
   */
  handleClickOpen = () => {
    this.setState({
      setOpen: true
    });
  };

  /**
   * Closes the modal
   */
  handleClickClose = () => {
    this.setState({
      setOpen: false
    });
  };

  /**
   * Mounts the component, and fetches the inital data. 
   */
  componentDidMount() {
    let currentComponent = this;
    var data = {
      groupId: this.state.groupId,
    }
    
    console.log(data);
    fetch("http://localhost:3001/dentalGroupProfile", {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this.props.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res =>  {
      console.log("fetch dentalGroupProfile");
      console.log(res.json());
      return res.json();
    }).then(result => {
      console.log("before loop");
      var resultData = [];
      for (var i = 0; i < result.length; i++) {
          let name = result[i].dentist_name;
          let officeEmail = result[i].email;
          let officeName = result[i].office_name;
          let action = <Button className="select" onClick={currentComponent.handleClick.bind(currentComponent,[result[i]])}>Select</Button>;
          let row = [];
          console.log("i: " + i + ", name: " + name + ", officeEmail: " + officeEmail + ", officeName: " + officeName);
          row.push(name);
          row.push(officeEmail);
          row.push(officeName);
          row.push(action);
          resultData.push(row);
      }
      currentComponent.setState({data: resultData});
      console.log(result);
    }).catch(function(err) {
      console.log(err);
    });
  }

  /**
   * Handles changes to the text inputs
   */
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  /**
   * Renders a blue button, transparent button, or typography depending on args passed. 
   * @param {param} param 
   */
  renderButton(param) {
    switch(param) {
      case 'blueButton':
        return (
          <Button
            className="blueButton"
            onClick={this.handleClickOpen}
          >
            {this.props.name}
          </Button>
        )
      case 'clearButton':
        return (
          <Button
            className="modal-clearButton"
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

  render() {
    const { classes } = this.props;
    return (
      <div className="profile">
        {this.renderButton(this.props.idType)}
        <Dialog
          open={this.state.setOpen}
          keepMounted
          onClose={this.handleClickClose}
          maxWidth={'md'}
          className="dental-modal-container1"
        >
          <DialogContent>
            <div className="dental-modal-container2"> 
              <ValidatorForm ref="form">
                <Typography align="center" className="dental-modal-header">
                  SWITCH OFFICE
                </Typography>

                <MUIDatatable 
                  className="datatable"
                  title={"Office"}
                  columns={columns}
                  options={options}
                  data={this.state.data}
                />

                <Grid container spacing={6} className="container1">
                  <Grid item xs={12} align="center">
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

export default withStyles(useStyles)(SwitchOfficeModal);