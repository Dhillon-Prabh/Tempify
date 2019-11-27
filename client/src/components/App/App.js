import React, { Component, useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";
import Navbar from "../Navbar/Navbar";
import Cookie from "../Cookie/Cookie";
import Schedule from "../Schedule/scheduleForTemp";
import ContactSection from "../Contact/ContactSection";
import OfficeProfileCard from "../ProfileCard/OfficeProfileCard";
import OfficeSchedule from "../Schedule/scheduleForOffice";
import TempSchedule from "../Schedule/scheduleForTemp"
import Button from "../Payment/PayButton"
import Modal from "../Schedule/OfficeModal"

class App extends Component {
  render() {
    return (
      <div className="App">
        <React.Fragment>
          <CssBaseline />
          <BrowserRouter>
            <ScrollToTop/>
            <Navbar />
            <Cookie />
          </BrowserRouter>
        </React.Fragment>
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
