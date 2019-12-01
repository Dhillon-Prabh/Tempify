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

    fetch("/auth/getEvents", {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + this.props.token,
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
          var id = data[i].id;
          var row = {};
          row.title = title;
          row.date = date;
          row.backgroundColor = "green";
          row.textColor = "white";
          row.borderColor = "rgba(0, 76, 76, 0.0)";
          row.fontWeight = "800";
          row.displayHours = true;
          row.id = id;

          var thisDate = new Date(row.date);
          var curDate = new Date();
          if (curDate < thisDate) {
            row.displayHours = false;
          }

          dataEvents.push(row)
        } else if(data[i].temp_status == "COMPLETE" && data[i].dental_status == "POSTED") {
          var title = data[i].office_name;
          var date = data[i].dates;
          var backgroundColor = "red";
          var id = data[i].id;
          var row = {};
          row.title = title;
          row.date = date;
          row.backgroundColor = backgroundColor;
          row.textColor = "white";
          row.borderColor = "rgba(0, 76, 76, 0.0)";
          row.displayHours = false;
          row.id = id;

          dataEvents.push(row);
          
        }
      }
      console.log(dataEvents);
      self.setState({events: dataEvents});
    }).catch(function(err) {
      console.log(err);
    });
  }
  
  state = { render: false, bookingId: '', displayHours: false };

  render() {
    const { render } = this.state;

    const eventClick = (info) => {
      console.log(info.event.id);
      this.setState({
        render: !render,
        bookingId: info.event.id,
        displayHours: info.event.extendedProps.displayHours,
      });
    };

    const setStateFromModal = (renderState) => {
      this.setState({
        render: renderState
      })
    }

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
            events={this.state.events}
            eventClick={eventClick}
          />
        </div>
        <div className="profileContainer">
            {render ? <Modal token = {this.props.token} bookingId={this.state.bookingId} displayHours={this.state.displayHours} renderState={setStateFromModal}/> : null}
          </div>
      </div>
    );
  }
}
