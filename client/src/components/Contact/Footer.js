import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link} from "react-router-dom";
import { Typography } from "@material-ui/core";

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
    marginRight: "10px",
    textDecoration: "none", 
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
        <Typography className={classes.footerContainers} component={Link} to="/pricing">Pricing</Typography>
        |
        <Typography className={classes.footerContainers} component={Link} to="/privacy">Privacy Policy</Typography>
        |
        <Typography className={classes.footerContainers} component={Link} to="/termsAndConditions">Terms and Conditions</Typography>
      </div>
      <div className={classes.copyrightMessage}>
        © Tempify. All rights reserved. @2017-2019.
      </div>
    </div>
  );
}
