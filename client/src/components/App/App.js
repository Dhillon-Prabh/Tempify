import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";
import Navbar from "../Navbar/Navbar";
import Cookie from "../Cookie/Cookie";
import ContactSection from "../Contact/ContactSection";
import ScrollToTop from "./ScrollToTop";

class App extends Component {
  render() {
    return (
      <div className="App">
        <React.Fragment>
          <CssBaseline />
          <BrowserRouter>
            <ScrollToTop/>
            <Navbar />
            <ContactSection />
            <Cookie />
          </BrowserRouter>
        </React.Fragment>
      </div>
    );
  }
}

export default App;
