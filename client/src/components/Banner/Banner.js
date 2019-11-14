import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import bannerImage from "../../images/original.jpg";
import Modal from '../Modal/Modal';

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    height: "650px",
    overflow: "hidden"
  },
  image: {
    width: "100%",
    marginTop: "-170px"
  },
  overlay: {
    backgroundColor: "black",
    opacity: "0.6",
    width: "100%",
    height: "650px",
    position: "absolute"
  },
  bannerMessage: {
    width: "100%",
    height: "650px",
    position: "absolute",
    zIndex: "1000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    color: "white"
  },
  topMessage: {
    textTransform: "uppercase",
    fontSize: "28pt",
    fontWeight: "900",
    marginBottom: "15px",
    marginTop: "25px"
  },
  botMessage: {
    fontSize: "12pt"
  },
  buttonContainer: {
    marginTop: "12px",
    display: "flex"
  },
}));

export default function() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.bannerMessage}>
        <div className={classes.topMessage}>Dental Temping Simplified</div>
        <div className={classes.botMessage}>
          The easiest way to book an ideal temp for your office.
        </div>

        <div className={classes.buttonContainer}>
          <Modal idType = "blueButton" name="BOOK NOW" link="/dentalregister"/>
          <Modal idType = "clearButton" name="BECOME A TEMP" link="/tempregister"/>
        </div>
      </div>
      <div className={classes.overlay}></div>
      <img className={classes.image} src={bannerImage} alt="banner" />
    </div>
  );
}
