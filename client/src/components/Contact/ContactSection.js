import React from "react";
import Contact from "./Contact";
import SocialMedia from "./SocialMedia";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "./Footer";

//
//
// This components nests the entire contact us section 
//
//

// CSS styles for the contact us section
const useStyles = makeStyles(theme => ({
  contactContainer: {
    width: "100%",
    height: "440px",
    display: "flex",
    alignItems: "center"
  }
}));

// Returns the contact us component and the social media component
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
