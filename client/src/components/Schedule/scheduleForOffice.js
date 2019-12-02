import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import OfficeModal from "./OfficeModal";
import "./main.scss";

/**
 *
 * This is the calendar component for the offices.
 *
 * @author Prabdeep Singh
 * @author Oscar Au
 * @version 1.2
 *
 */
export default class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      token: this.props.token
    };
  }

  /**
   * Grabs information from the local storage when component is mounted
   */
  componentDidMount() {
    let self = this;
    var data = {
      userId: localStorage.getItem("userId"),
      role: localStorage.getItem("role")
    };

    /**
     * Gets the data for the schedule
     */
    fetch("http://localhost:3001/getEventsOffice", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + this.props.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(function(response) {
      return response.json();
    }).then(function(dataAll) {
      var dataEvents = [];
      if (dataAll.length === 2) { //both bookings and gigs returned
        var data = dataAll[0]; 
        for (var i = 0; i < data.length; i++) { //bookings
          if(data[i].temp_status === "ACCEPTED" && data[i].dental_status === "POSTED") {
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
          } else if(data[i].temp_status === "COMPLETE" && data[i].dental_status === "POSTED") {
            title = data[i].temp_name;
            date = data[i].dates;
            id = data[i].id;
            row = {};
            row.title = title;
            row.date = date;
            row.backgroundColor = "red";
            row.textColor = "white";
            row.borderColor = "rgba(0, 76, 76, 0.0)";
            row.id = id;
            row.disablePay = false;


            dataEvents.push(row);
          }
        }
        var posted = dataAll[1]; //these are gigs
        for (var j = 0; j < posted.length; j++) {
          title = posted[j].time;
          date = posted[j].date;
          row = {};
          row.title = title;
          row.date = date;
          row.backgroundColor = "orange";

          dataEvents.push(row);
        }
      } else if (dataAll.length === 1) { // either bookings or gigs returned
          var data = dataAll[0];
          if (!data[0].id) { //gigs returned
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
          } else {
            // bookings returned
            for (var i = 0; i < data.length; i++) {
              if (
                data[i].temp_status == "ACCEPTED" &&
                data[i].dental_status == "POSTED"
              ) {
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
              } else if(data[i].temp_status === "COMPLETE" && data[i].dental_status === "POSTED") {
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
    });
  }

  state = { render: false, bookingId: "", disablePay: false };

  render() {
    const { render } = this.state;

    const eventClick = (info) => {
      if (info.event.id !== '') {
        this.setState({
          render: !render,
          bookingId: info.event.id,
          disablePay: info.event.extendedProps.disablePay
        });
      }
    };

    /**
     * Function as prop to pass to child to close modal
     */
    const setStateFromModal = renderState => {
      this.setState({
        render: renderState
      });
    };

    /**
     * Returns the calendar component which nests a modal for on click functions
     */
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
            displayEventTime={false}
            events={this.state.events}
            eventClick={eventClick}
          />
        </div>
        <div className="profileContainer">
          {render ? (
            <OfficeModal
              token={this.props.token}
              bookingId={this.state.bookingId}
              disablePay={this.state.disablePay}
              renderState={setStateFromModal}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
