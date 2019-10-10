import React from 'react';
import CookieBanner from 'react-cookie-banner';
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
      <CookieBanner
        styles={styles}
        message="Tempify uses cookies to ensure you get better experience on our website. Feel free to review our "
        buttonMessage="That's Fine"
        link={<span class='nomargin'><a class="link" href='http://nocookielaw.com/'>Privacy Policy</a> here</span>}
        onAccept={() => {}}
        cookie="user-has-accepted-cookies"
        className="cookie">
        
      </CookieBanner>
    )
  }
}

export default Cookie;