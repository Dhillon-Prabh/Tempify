import React, { Component, useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";
import Navbar from "../Navbar/Navbar";
import Cookie from "../Cookie/Cookie";
import Schedule from "../Schedule/schedule";
import ContactSection from "../Contact/ContactSection";

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
<<<<<<< HEAD
        </React.Fragment> */}
        <Schedule />
        <ContactSection />
=======
        </React.Fragment> 
>>>>>>> 6020f3222e78a020382de30822b8359bbfd9b076
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
