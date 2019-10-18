import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import bannerImage from "./original.jpg";

const useStyles = makeStyles(theme =>({
    container:{
        width: "100%",
        height: "530px",
    },
    image: {
        width: "100%",
        height: "100%",
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover"
    }
}));

export default function(){
    const classes = useStyles();
    return (
        <div className={classes.container}>
        <div className={classes.image}>

        </div>
        </div>
    )
}