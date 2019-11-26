import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ProfileCard from "../ProfileCard/ProfileCard";
import Modal from "./modal"

import "./main.scss";
import { red } from "@material-ui/core/colors";
import { textAlign } from "@material-ui/system";

export default class Calendar extends React.Component {


  state = { render: false };

  render() {
    const { render } = this.state;

    const eventClick = () => {
      this.setState({
        render: !render
      });
    };

    return (
      <div className="outerContainer">
        <div class="container">
          <div class="legend-container">
            <div className="pendingBox">
              <div />
            </div>
            <div className="pending">Pending</div>
            <div className="acceptedBox"></div>
            <div className="accepted">Accepted</div>
            <div className="completedBox"></div>
            <div className="completed">Completed</div>
          </div>
          <FullCalendar
            defaultView="dayGridMonth"
            plugins={[dayGridPlugin, interactionPlugin]}
            events={[
              {
                title: "Event ",
                date: "2019-11-25",
                textColor: "red",
                backgroundColor: "white",
                borderColor: "white",
                textAlign: "center",
                paddingTop: "5px"
              }
            ]}
            eventClick={eventClick}
          />
        </div>
        <div className="profileContainer">
            {render ? <Modal eventClick={this.eventClick} /> : null}
          </div>
      </div>
    );
  }
}
