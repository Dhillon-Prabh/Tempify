import React, { Component } from 'react';
import {Redirect, Route, Switch, withRouter, BrowserRouter} from "react-router-dom";

import './App.css';
import Navbar from '../Navbar/Navbar'
import Login from '../Login/Login'




class App extends Component {
  render() {

    return (
      <div className="App">

			<BrowserRouter>
				<Navbar />
			</BrowserRouter>

      </div>
    )
  }
}

export default App;