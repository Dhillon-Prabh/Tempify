import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import bannerImage from "../../images/original.jpg";
import Button from "@material-ui/core/Button";
import { NavLink, Route, Switch } from "react-router-dom";
import BlueButton from "../Buttons/BlueButton";
import ClearButton from "../Buttons/ClearButton";

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    height: "550px",
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
    height: "550px",
    position: "absolute"
  },
  bannerMessage: {
    width: "100%",
    height: "550px",
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
  buttonRight: {
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
  }
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
          <BlueButton />
          <ClearButton />
        </div>
      </div>
      <div className={classes.overlay}></div>
      <img className={classes.image} src={bannerImage} />
    </div>
  );
}
