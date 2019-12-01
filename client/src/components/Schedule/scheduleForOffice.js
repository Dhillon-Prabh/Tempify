import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import OfficeProfileCard from "../ProfileCard/OfficeProfileCard";
import OfficeModal from "./OfficeModal"
import { format } from "date-fns";
import parseISO from "date-fns/parseISO";
import moment from 'moment'
import 'moment-timezone';

import "./main.scss";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      token: this.props.token
    }
}
  componentDidMount() {
    let self = this;
    var data = {
      userId: localStorage.getItem("userId"),
      role: localStorage.getItem("role")
    }

    fetch("/auth/getEventsOffice", {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + this.props.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(function(response) {
      return response.json();
    }).then(function(dataAll) {
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
          // console.log("before", date);

          date = moment().tz('America/Vancouver').format('YYYY-MM-DD');
          // console.log("before date", date);
          // date = format(parseISO(date), 'yyyy-MM-dd');
          var backgroundColor = "orange";
          var row = {};
          row.title = title;

          moment.utc(date, 'YYYY-MM-DD').unix();
          console.log("date right before row.date", date);
          row.date = date;
          console.log("after row.date", row.date);
          row.backgroundColor = backgroundColor;
          dataEvents.push(row);
        }
        // console.log("date object formated", date);
        // console.log("gig from dataAll[1]", dataEvents);
      } else if (dataAll.length == 1) { // either bookings or gigs returned
          var data = dataAll[0];
          if (!data[0].id) { //gigs returned
            for (var i = 0; i < data.length; i++) {
              var title = data[i].time;
              var date = data[i].date;
              date = format(parseISO(date), 'yyyy-MM-dd');
              var backgroundColor = "orange";
              var row = {};
              row.title = title;
              row.date = date;
              row.backgroundColor = backgroundColor;
              dataEvents.push(row);
            }

            console.log("gig from if dataAll.length == 1", date);

      
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
      self.setState({events: dataEvents});
    }).catch(function(err) {
      console.log(err);
    });
  }
  
  state = { render: false, bookingId: '', disablePay: false };

  render() {
    const { render } = this.state;

    const eventClick = (info) => {
      // console.log("BookingID", info.event.id);
      if (info.event.id !== '') {
        this.setState({
          render: !render,
          bookingId: info.event.id,
          disablePay: info.event.extendedProps.disablePay,
        });
      }
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
            {render ? <OfficeModal token = {this.props.token} bookingId={this.state.bookingId} disablePay={this.state.disablePay} renderState={setStateFromModal}/> : null}
          </div>
      </div>
    );
  }
}
