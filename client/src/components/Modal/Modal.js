import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {Link} from 'react-router-dom';
import {
 Typography
} from '@material-ui/core';

import './Modal.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

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

  render() {
    return (
      <div>
        <Typography variant = "subheading" onClick={this.handleClickOpen}>{this.props.name}</Typography>

        <Dialog
          open={this.state.setOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClickClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title" className = "modal-title"> Welcome To Tempify </DialogTitle>
          <DialogContent className = "modal-container">
            <DialogContentText id="alert-dialog-slide-description">
            <Button onClick={this.handleClickClose} className = "modal-login-blueButton" m={2} component={Link} to="/login">
              Login
            </Button>
            <Button onClick={this.handleClickClose} className = "modal-register-blueButton" m={2}>
              Register
            </Button>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}


export default Modal;
