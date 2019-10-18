import React from "react";
import Contact from "./Contact";
import SocialMedia from "./SocialMedia";
import { mergeClasses } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "./Footer";

const useStyles = makeStyles(theme => ({
  contactContainer: {
    width: "100%",
    height: "440px",
    display: "flex",
    alignItems: "center"
  }
}));

export default function() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.contactContainer}>
        <SocialMedia />
        <Contact />
      </div>
      <Footer />
    </div>
  );
}
