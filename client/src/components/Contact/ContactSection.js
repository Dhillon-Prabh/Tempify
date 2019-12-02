import React from "react";
import Contact from "./Contact";
import SocialMedia from "./SocialMedia";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "./Footer";

/**
 * 
 * This is the contact us form to send e-mails
 * Nests 2 components - social media component and contact us form
 * @author Oscar Au
 * @version 1.22
 * 
 */

/**
 * CSS styling for the contact us section component
 */
const useStyles = makeStyles(theme => ({
  contactContainer: {
    width: "100%",
    height: "440px",
    display: "flex",
    alignItems: "center"
  }
}));

/**
 * Returns the contact us component and the social media component
 */
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
