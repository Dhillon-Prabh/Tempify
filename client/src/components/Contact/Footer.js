import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Route } from "react-router-dom";
import TermsAndConditions from '../Terms/TermsAndConditions';
import { Typography } from "@material-ui/core";

//
//
// This component nests the footer components together
// This includes the policies
//
//

// CSS styles for the footer component
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
    textDecoration: "none"
  },
  copyrightMessage: {
    color: "gray"
  }
}));

// Returns 3 nests component as 1 component
export default function() {
  const classes = useStyles();
  return (
    <div className={classes.outerContainer}>
      <div className={classes.container}>
        {/* Attacks the links to react router */}
        <Typography className={classes.footerContainers} component={Link} to="/pricing">Pricing</Typography>
        <Typography className={classes.footerContainers} component={Link} to="/privacy">Privacy Policy</Typography>
        <Typography className={classes.footerContainers} component={Link} to="/termsAndConditions">Terms and Conditions</Typography>
      </div>
      <div className={classes.copyrightMessage}>
        © Tempify. All rights reserved. @2017-2019.
      </div>
    </div>
  );
}
