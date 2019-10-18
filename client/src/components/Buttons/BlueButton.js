import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Popover from '@material-ui/core/Popover'

const useStyles = makeStyles(theme => ({
    buttonLeft: {
        backgroundColor: "#00bfff",
        border: "1px solid lightgray",
        boxShadow: "none",
        padding: "10px 20px",
        borderRadius: "0",
        width: "170px",
        height: "44px",
        marginLeft: "7px",
        marginRight: "7px",
        border: "0",
        fontSize: "0.8rem",
        fontWeight: "900",
        "&:hover": {
          backgroundColor: "#00bfff",
          boxShadow: "none"
        }
    },
    loginBtn: {
      backgroundColor: "#00bfff",
      border: "1px solid lightgray",
      boxShadow: "none",
      padding: "10px 20px",
      borderRadius: "0",
      width: "170px",
      height: "44px",
      marginLeft: "7px",
      marginRight: "7px",
      border: "0",
      fontWeight: "900",
      "&:hover": {
        backgroundColor: "#00bfff",
        boxShadow: "none"
      }
    },
    registerBtn: {
      backgroundColor: "white",
      border: "1px solid lightgray",
      boxShadow: "none",
      padding: "10px 20px",
      borderRadius: "0",
      backgroundColor: "transparent",
      width: "170px",
      height: "44px",
      marginLeft: "7px",
      marginRight: "7px",
      fontWeight: "900",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        boxShadow: "none"
      }
    },
    modalContainer: {
      width: "400px",
      height: "150px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }
}));

const BlueButton = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        className={classes.buttonLeft}
        color="primary"
        variant="contained"
        onClick={handleClickOpen}
      >
        Book Now
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{margin: "0 0 150px 0"}}
      >
        <div className={classes.modalContainer}>
          <DialogTitle id="alert-dialog-title">Welcome to Tempify</DialogTitle>
          <div className={classes.btnContainer}>
            <Button
              className={classes.loginBtn}
              onClick={handleClose}
              color="primary"
            >
              Login
            </Button>
            <Button
              className={classes.registerBtn}
              onClick={handleClose}
              color="primary"
              autoFocus
            >
              Register
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default BlueButton;