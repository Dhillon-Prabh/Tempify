import React, {Component} from 'react';
import './Pending.css'

class Pending extends Component {

  render(){
    return (
      <div className="Pending-container">
        <p>Currently, there you have no jobs that are pending</p>
      </div>
    )
  }
}

export default Pending;