import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "./paymentRequestButton";

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
      backgroundColor: "white",
      marginTop: "12px",
      display: "flex",
      flexDirection: "column",
      marginLeft: "25px"
    },
  },
}));

export default function BasicTextFields() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="standard-basic" label="Hour" />
      <TextField id="standard-basic" label="Minute" />
      <Button />
    </form>
  );
}