import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import "./main.scss";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  legendContainer: {
    height: "100px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  legend: {
    margin: "0 10px 0 10px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  pendingBox: {
    height: "15px",
    width: "15px",
    backgroundColor: "orange",
    margin: "0 10px 0 0"
  },
  acceptedBox: {
    height: "15px",
    width: "15px",
    backgroundColor: "green",
    margin: "0 10px 0 0"
  },
  completedBox: {
    height: "15px",
    width: "15px",
    backgroundColor: "red",
    margin: "0 10px 0 0"
  }
}));

export default function() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.legendContainer}>
        <div className={classes.legend}>
          <div className={classes.pendingBox} /> Pending
        </div>
        <div className={classes.legend}>
          <div className={classes.acceptedBox} />
          Accepted
        </div>
        <div className={classes.legend}>
          <div className={classes.completedBox} />
          Completed
        </div>
      </div>
      <FullCalendar
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin]}
        header={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth, dayGridWeek, dayGridDay"
        }}
        styles={{ width: "60%" }}
      />
    </div>
  );
}
