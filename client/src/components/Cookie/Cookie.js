import React from 'react';
import CookieBanner from 'react-cookie-banner';
import { Link, Route, Switch} from "react-router-dom";
import Policy from '../Policy/Policy'

import './Cookie.css'


const styles = {
  link: {
    textDecoration: 'none',
  },
  button: {
    position: 'default',
    background: 'rgb(241,214,0)',
    display: 'inline-block',
    borderRadius: '5px',
    padding: '0 20px',
    margin: '0 60px 0 10px'
  },
}

class Cookie extends React.Component {
  render() {
    return(
      <div>
        <CookieBanner
          styles={styles}
          message="Tempify uses cookies to ensure you get better experience on our website. Feel free to review our "
          buttonMessage="That's Fine"
          link={<span class='nomargin'><Link to={'/policy'} className='link'>Privacy Policy</Link> here</span>}
          onAccept={() => {}}
          cookie="user-has-accepted-cookies"
          className="cookie">
        </CookieBanner>
        <Switch>
          <Route path='/policy' component={Policy}/>
        </Switch>
      </div>
    )
  }
}

export default Cookie;