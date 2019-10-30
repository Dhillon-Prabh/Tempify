import React, { Component, useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";
import Navbar from "../Navbar/Navbar";
import Cookie from "../Cookie/Cookie";
import ContactSection from "../Contact/ContactSection";
import ProfileCard from "../ProfileCard/ProfileCard";
import History from "../History/History";


class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <React.Fragment>
        <CssBaseline />
          <BrowserRouter>
            <ScrollToTop/>
            <Navbar />
            <ContactSection />
            <Cookie />
          </BrowserRouter>
        </React.Fragment> */}
        <History/>
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
