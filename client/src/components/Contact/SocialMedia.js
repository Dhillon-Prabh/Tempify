import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme =>({
    contactContainer: {
        width: "45%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        marginLeft: "5%",
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
    label: {
        height: "50px",
        width: "50px",
        backgroundColor: "lightBlue",
        marginRight: "10px",
        marginTop: "5px",
        borderRadius: "100px"
    }
}));

export default function() {
const classes = useStyles();
    
    return (
        <div className={classes.contactContainer}>
            <div className={classes.emailUs}>
                Email Us
            </div>
            <div className={classes.emailUsMessage}>
            We are here to answer any questions you may have about the service. Reach out to us and we'll respond as soon as we can.
            </div>
            <div className={classes.socialMedia}>
                <div className={classes.label}></div>
                <div className={classes.label}></div>
                <div className={classes.label}></div>
            </div>
        </div>
    )
}