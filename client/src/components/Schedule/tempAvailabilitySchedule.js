import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import "./main.scss";
import { red } from "@material-ui/core/colors";
import { textAlign } from "@material-ui/system";

export default class TempAvailabilitySchedule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: []
    };
  }
  
  componentDidMount() {}

  state = {};

  render() {
    const { render } = this.state;

    const handleDateClick = () => {
      alert("pls work");
    };

    return (
      <div className="outerContainer">
        <div class="container">
          <FullCalendar
            defaultView="dayGridMonth"
            plugins={[dayGridPlugin, interactionPlugin]}
            events={this.state.events}
            dateClick={handleDateClick}
          />
        </div>
      </div>
    );
  }
}
