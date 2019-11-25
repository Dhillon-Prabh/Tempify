import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ProfileCard from "../ProfileCard/ProfileCard";

import "./main.scss";

export default class Calendar extends React.Component {

  componentDidMount() {
    let currentComponent = this;
    var data = {
      userId: localStorage.getItem("userId")
    }

    fetch("http://localhost:3001/getTempEvent", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(function(response) {
      console.log(response);
      return response.json();
    }).then(function(data) {
      console.log(data);
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
          events={[{ title: "event 1", date: "2019-11-25" }]}
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
