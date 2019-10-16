import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

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
        <Button onClick={this.handleClickOpen}>
          {this.props.name}
        </Button>
        <Dialog
          open={this.state.setOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClickClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title"> Welcome To Tempify </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
            <Button onClick={this.handleClickClose} color="primary">
              Login
            </Button>
            <Button onClick={this.handleClickClose} color="primary">
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