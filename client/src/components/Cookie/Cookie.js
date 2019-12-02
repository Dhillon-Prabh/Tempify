import React from 'react';
import CookieBanner from 'react-cookie-banner';
import { Link, Route, Switch} from "react-router-dom";
import Policy from '../Policy/Policy'
import './Cookie.css'

/**
 * Component for the cookie bar. 
 * Cookie bar is displayed at the bottom of the window.
 * User can click the accept button or scroll the window to make the 
 * bar disappear.
 * 
 * @author John Ham
 * @version 1.0
 */

// CSS style for the cookie component
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

// Returns the Cookie component
class Cookie extends React.Component {
  render() {
    return(
      <div>
        {/* Cookie component  */}
        <CookieBanner
          styles={styles}
          message="Tempify uses cookies to ensure you get better experience on our website. Feel free to review our "
          buttonMessage="That's Fine"
          link={<span class='nomargin'><Link to={'/policy'} className='link'>Privacy Policy</Link> here</span>}
          onAccept={() => {}}
          cookie="user-has-accepted-cookies"
          className="cookie">
        </CookieBanner>
        {/* React router path to link to privacy policy of how cookie is used */}
        <Switch>
          <Route path='/policy' component={Policy}/>
        </Switch>
      </div>
    )
  }
}

export default Cookie;