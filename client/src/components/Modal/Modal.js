import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {Link} from 'react-router-dom';
import {
 Typography
} from '@material-ui/core';

import './Modal.css';

class Modal extends Component{

  constructor(props) {
    super(props);

    this.state = {
      setOpen: false,
      open: false
    }
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
          className="modal-clearButton"
          onClick={this.handleClickOpen}
        >
          {this.props.name}
        </Button>
          )
      case 'typography':
        return <Typography variant = "subheading" onClick={this.handleClickOpen}>{this.props.name}</Typography>;
    }
  }
    
  render() {

    return (
      <div >
        {this.renderButton(this.props.idType)}

        <Dialog
          open={this.state.setOpen}
          keepMounted
          onClose={this.handleClickClose}
        >
          <DialogContent className = "modal-container">
            <div> 
              <p className= "modal-title"> Welcome To Tempify</p>
            </div>
            <Button onClick={this.handleClickClose} className = "modal-login-blueButton" m={2} component={Link} to="/login">
              Login
            </Button>
            <Button onClick={this.handleClickClose} className = "modal-register-blueButton" m={2} component={Link} to="/register">
              Register
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}


export default Modal;
