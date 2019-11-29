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

    fetch("http://localhost:3001/getEventsOffice", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(function(response) {
      console.log(response);
      return response.json();
    }).then(function(dataAll) {
      console.log(dataAll);
      var dataEvents = [];
      if (dataAll.length == 2) { //we get bookings and gigs
        var data = dataAll[0]; // these are bookings
        for (var i = 0; i < data.length; i++) {
          if(data[i].temp_status == "ACCEPTED" && data[i].dental_status == "POSTED") {
            var title = data[i].temp_name;
            var date = data[i].dates;
            var id = data[i].id;
            var row = {};
            row.title = title;
            row.date = date;
            row.backgroundColor = "green";
            row.textColor = "white";
            row.borderColor = "rgba(0, 76, 76, 0.0)";
            row.id = id;
            row.disablePay = true;

            dataEvents.push(row)
          } else if(data[i].temp_status == "COMPLETE" && data[i].dental_status == "POSTED") {
            var title = data[i].temp_name;
            var date = data[i].dates;
            var backgroundColor = "red";
            var id = data[i].id;
            var row = {};
            row.title = title;
            row.date = date;
            row.backgroundColor = backgroundColor;
            row.textColor = "white";
            row.borderColor = "rgba(0, 76, 76, 0.0)";
            row.id = id;
            row.disablePay = false;

            dataEvents.push(row);
          }
        }
        var posted = dataAll[1]; //these are gigs
        for (var i = 0; i < posted.length; i++) {
          var title = posted[i].time;
          var date = posted[i].date;
          var backgroundColor = "orange";
          var row = {};
          row.title = title;
          row.date = date;
          row.backgroundColor = backgroundColor;

          dataEvents.push(row);
        }
      } else if (dataAll.length == 1) { // either bookings or gigs returned
          var data = dataAll[0];
          console.log("Only one returned data", data);
          if (data[0].length == 2) { //gigs returned
            for (var i = 0; i < data.length; i++) {
              var title = data[i].time;
              var date = data[i].date;
              var backgroundColor = "orange";
              var row = {};
              row.title = title;
              row.date = date;
              row.backgroundColor = backgroundColor;
    
              dataEvents.push(row);
            }
          } else { // bookings returned
            for (var i = 0; i < data.length; i++) {
              if(data[i].temp_status == "ACCEPTED" && data[i].dental_status == "POSTED") {
                var title = data[i].temp_name;
                var date = data[i].dates;
                var id = data[i].id;
                var row = {};
                row.title = title;
                row.date = date;
                row.backgroundColor = "green";
                row.textColor = "white";
                row.borderColor = "rgba(0, 76, 76, 0.0)";
                row.id = id;
                row.disablePay = true;
    
                dataEvents.push(row)
              } else if(data[i].temp_status == "COMPLETE" && data[i].dental_status == "POSTED") {
                var title = data[i].temp_name;
                var date = data[i].dates;
                var backgroundColor = "red";
                var id = data[i].id;
                var row = {};
                row.title = title;
                row.date = date;
                row.backgroundColor = backgroundColor;
                row.textColor = "white";
                row.borderColor = "rgba(0, 76, 76, 0.0)";
                row.id = id;
                row.disablePay = false;
    
                dataEvents.push(row);
              }
            }
          }
      }
      console.log(dataEvents);
      self.setState({events: dataEvents});
    }).catch(function(err) {
      console.log(err);
    });
  }
  
  state = { render: false, bookingId: '', disablePay: false };

  render() {
    const { render } = this.state;

    const eventClick = (info) => {
      console.log("BookingID", info.event.id);
      if (info.event.id !== '') {
        this.setState({
          render: !render,
          bookingId: info.event.id,
          disablePay: info.event.extendedProps.disablePay,
        });
      }
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
            displayEventTime= {false}
            events={this.state.events}
            eventClick={eventClick}
          />
        </div>
        <div className="profileContainer">
            {render ? <OfficeModal bookingId={this.state.bookingId} disablePay={this.state.disablePay}/> : null}
          </div>
      </div>
    );
  }
}
