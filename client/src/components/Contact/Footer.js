import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  outerContainer: {
    width: "100%",
    height: "100px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  footerContainers: {
    marginLeft: "10px",
    marginRight: "10px"
  },
  copyrightMessage: {
    color: "gray"
  }
}));

export default function() {
  const classes = useStyles();
  return (
    <div className={classes.outerContainer}>
      <div className={classes.container}>
        <div className={classes.footerContainers}>Pricing</div>
        <div className={classes.footerContainers}>Privacy Policy</div>
        <div className={classes.footerContainers}>Terms and Conditions</div>
      </div>
      <div className={classes.copyrightMessage}>
        © Tempify. All rights reserved. @2017-2018.
      </div>
    </div>
  );
}
