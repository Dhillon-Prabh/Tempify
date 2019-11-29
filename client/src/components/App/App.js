import React, { Component, useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";
import Navbar from "../Navbar/Navbar";
import Cookie from "../Cookie/Cookie";
import DashBoard from "../Dashboard/Dashboard"
import OfficeCard from "../ProfileCard/OfficeProfileCard"
import BookNow from "../BookNow/BookNow"
import DentailProfile from "../Profile/DentalProfile"
import TempSchedule from "../Schedule/scheduleForTemp"
import TempAvailabilitySchedule from "../Schedule/tempAvailabilitySchedule";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <React.Fragment>
          <CssBaseline />
          <BrowserRouter>
            <ScrollToTop/>
            <Navbar />
            <Cookie />
          </BrowserRouter>
        </React.Fragment> */}
        {/* <OfficeCard /> */}
        {/* <BookNow />
        {/* <DentailProfile /> */}
        <TempAvailabilitySchedule />
      </div>
    );
  }
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default App;
