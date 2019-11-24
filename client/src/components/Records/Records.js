import React, {Component} from 'react';
import ProfileCard from '../ProfileCard/ProfileCard'


class Records extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div className="Pending-container">
        <ProfileCard
          status="ACCEPTED"
          practice="asda"
          software="software"
          experience="50"
          location="BC"
          wage="50"
          bookingId="A8123012"
        />
      </div>
    )
  }
}

export default Records;