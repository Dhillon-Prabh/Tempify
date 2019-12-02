import React, {Component} from 'react';
import './Pending.css'

/**
 * Shows 'Pending' gigs. Client mentioned in previous meetings 
 * that this feature may be removed so as of now it is not complete. 
 * @author Joe Fong 
 * @version 1.0 
 */
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