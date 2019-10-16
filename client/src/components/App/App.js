import React, { Component } from 'react';
import {Redirect, Route, Switch, withRouter, BrowserRouter} from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import Navbar from '../Navbar/Navbar'
import Cookie from '../Cookie/Cookie'


class App extends Component {
  render() {
    return (
      <div className="App">
        <React.Fragment>
          <CssBaseline />
          <BrowserRouter>
            <Navbar />
          </BrowserRouter>
        </React.Fragment>
        <Cookie/>
      </div>
    )
  }
}

export default App;