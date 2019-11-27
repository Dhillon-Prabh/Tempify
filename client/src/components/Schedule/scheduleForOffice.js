import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import OfficeProfileCard from "../ProfileCard/OfficeProfileCard";
import OfficeModal from "./OfficeModal"

import "./main.scss";
import { red } from "@material-ui/core/colors";
import { textAlign } from "@material-ui/system";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: []
    }
}
  componentDidMount() {
    let self = this;
    var data = {
      userId: localStorage.getItem("userId"),
      role: localStorage.getItem("role")
    }

    fetch("http://localhost:3001/getEvents", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(function(response) {
      console.log(response);
      return response.json();
    }).then(function(data) {
      console.log(data);
      var dataEvents = [];
      for (var i = 0; i < data.length; i++) {
        if(data[i].temp_status == "ACCEPTED" && data[i].dental_status == "POSTED") {
          var title = data[i].office_name;
          var date = data[i].dates;
          var row = {};
          row.title = title;
          row.date = date;
          row.backgroundColor = "rgba(0, 76, 76, 0.0)";
          row.textColor = "green";
          row.borderColor = "rgba(0, 76, 76, 0.0)";

          dataEvents.push(row)
        } else if(data[i].temp_status == "COMPLETED" && data[i].dental_status == "POSTED") {
          var title = data[i].office_name;
          var date = data[i].dates;
          var backgroundColor = "#a10628";
          var row = {};
          row.title = title;
          row.date = date;
          row.backgroundColor = backgroundColor;
          row.backgroundColor = "rgba(0, 76, 76, 0.0)";
          row.textColor = "red";
          row.borderColor = "rgba(0, 76, 76, 0.0)";

          dataEvents.push(row);
        }
      }
      console.log(dataEvents);
      self.setState({events: dataEvents});
    }).catch(function(err) {
      console.log(err);
    });
  }
  
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
            <div className="completed">Payment Required</div>
          </div>
          <FullCalendar
            defaultView="dayGridMonth"
            plugins={[dayGridPlugin, interactionPlugin]}
            events={this.state.events}
            eventClick={eventClick}
            events={[
              { title: 'event 1', date: '2019-11-11' },
              { title: 'event 2', date: '2019-11-12' }
            ]}
          />
        </div>
        <div className="profileContainer">
            {render ? <OfficeModal/> : null}
          </div>
      </div>
    );
  }
}
