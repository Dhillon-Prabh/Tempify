import React, { Component, useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";
import Navbar from "../Navbar/Navbar";
import Cookie from "../Cookie/Cookie";

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

// Takes user back to the top of the page when navigation links are clicked
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default App;
