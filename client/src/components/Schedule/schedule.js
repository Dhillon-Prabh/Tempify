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
  constructor(props) {
    super(props);

<<<<<<< HEAD

=======
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
          var backgroundColor = "#06a170";
          var row = {};
          row.title = title;
          row.date = date;
          row.backgroundColor = backgroundColor;

          dataEvents.push(row)
        } else if(data[i].temp_status == "COMPLETED" && data[i].dental_status == "POSTED") {
          var title = data[i].office_name;
          var date = data[i].dates;
          var backgroundColor = "#a10628";
          var row = {};
          row.title = title;
          row.date = date;
          row.backgroundColor = backgroundColor;

          dataEvents.push(row);
        }
      }
      console.log(dataEvents);
      self.setState({events: dataEvents});
    }).catch(function(err) {
      console.log(err);
    });
  }
  
>>>>>>> 6020f3222e78a020382de30822b8359bbfd9b076
  state = { render: false };

  render() {
    const { render } = this.state;

    const eventClick = () => {
      this.setState({
        render: !render
      });
    };

    return (
<<<<<<< HEAD
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
=======
      <div class="container">
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin, interactionPlugin]}
          events={this.state.events}
          eventClick={eventClick}
        />
        {
          render ?
        <ProfileCard />
        : null
        }
>>>>>>> 6020f3222e78a020382de30822b8359bbfd9b076
      </div>
    );
  }
}
