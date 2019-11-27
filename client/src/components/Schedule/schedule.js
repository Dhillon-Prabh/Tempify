import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ProfileCard from "../ProfileCard/ProfileCard";

import "./main.scss";

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
  
  state = { render: false };

  render() {

    const {render} = this.state;

    const eventClick = () => {
      this.setState({
        render: !render
      })
    };

    const getEvents = () => {

    }

    return (
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
      </div>
    );
  }
}
