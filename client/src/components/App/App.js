import React, { Component } from 'react';
import './App.css';
import Navbar from '../Navbar/Navbar'
import {Block1, Block2, Block3, Block4} from '../Block/Block'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Block1/>
        <Block2/>
        <Block3/>
        <Block4/>
      </div>
    )
  }
}

export default App;