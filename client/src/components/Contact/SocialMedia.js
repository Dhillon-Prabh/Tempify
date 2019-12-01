import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(fab);

//
//
// This component displays information for Tempify's social media information
//
//

// CSS styling for the component
const useStyles = makeStyles(theme => ({
  contactContainer: {
    width: "45%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    marginLeft: "5%",
    borderTop: "1px solid lightgray",
    borderRight: "1px solid lightgray",
    borderBottom: "1px solid lightgray"
  },
  emailUs: {
    width: "75%",
    fontSize: "25pt",
    fontWeight: "700"
  },
  emailUsMessage: {
    width: "75%",
    marginTop: "5px",
    marginBottom: "5px",
    lineHeight: "22px"
  },
  socialMedia: {
    width: "75%",
    display: "flex"
  },
  instagramLabel: {
    height: "50px",
    width: "50px",
    backgroundColor: "#84c3e7",
    marginRight: "10px",
    marginTop: "5px",
    borderRadius: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: "15px",
    '&:hover': {
      backgroundColor: "#84c3e7",
      opacity: "0.9"
    }
  },
  twitterLabel: {
    height: "50px",
    width: "50px",
    backgroundColor: "#84dae7",
    marginRight: "10px",
    marginTop: "5px",
    borderRadius: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: "15px",
    '&:hover': {
      backgroundColor: "#84dae7",
      opacity: "0.9"
    }
  },
  facebookLabel: {
    height: "50px",
    width: "50px",
    backgroundColor: "#75aae6",
    marginRight: "10px",
    marginTop: "5px",
    borderRadius: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: "15px",
    '&:hover': {
      backgroundColor: "#75aae6",
      opacity: "0.9"
    }
  }
}));

export default function() {
  const classes = useStyles();

  return (
    <div className={classes.contactContainer}>
      <div className={classes.emailUs}>Email Us</div>
      <div className={classes.emailUsMessage}>
        We are here to answer any questions you may have about the service.
        Reach out to us and we'll respond as soon as we can.
      </div>
      <div className={classes.socialMedia}>
            {/* Hold button and link to Tempify's twitter page */}
        <a href="https://twitter.com/Tempify_co">
          <div className={classes.twitterLabel}>
          <FontAwesomeIcon icon={['fab', 'twitter']} size="2x"/>
          </div>
        </a>
              {/* Hold button and link to Tempify's facebook page */}
        <a href="https://www.facebook.com/tempify">
          <div className={classes.facebookLabel}>
          <FontAwesomeIcon icon={['fab', 'facebook-f']} size="2x"/>
          </div>
        </a>
              {/* Hold button and link to Tempify's instagram page */}
        <a href="https://www.instagram.com/tempify.co/">
          <div className={classes.instagramLabel}>
          <FontAwesomeIcon icon={['fab', 'instagram']} size="2x"/>
          </div>
        </a>
      </div>
    </div>
  );
}
