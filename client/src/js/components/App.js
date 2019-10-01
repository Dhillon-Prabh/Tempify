import React, { Component } from 'react';
import axios from "axios";

import SignIn from "./login/SignIn";

import '../../css/App.css';

class App extends Component {

  // axios request test
  componentDidMount() {
    axios.get('http://localhost:3001/')
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
      })
  }

  render() {
    return (
      <div className="App">
      <header className="App-header">
        <SignIn />
        <p> Hello World </p> 
      </header>
      </div>
    )
  }
}

export default App;