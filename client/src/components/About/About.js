import React from 'react';
import Typography from '@material-ui/core/Typography';
import './About.css'
import { Grid } from '@material-ui/core';

const AboutContent = (props) => {
    return (
        <Typography align="left" display="block" variant="body1" className="AboutContent">
            {props.content}
        </Typography>
    );
}

const AboutHeader = () => {
    return (
        <React.Fragment>
            <Typography align="center" display="block" variant="h4" className="AboutHeader">
                About Us
            </Typography>
            <Grid container spacing={0} direction="column" alignItems="center" justify="center">
                <AboutContent 
                content="Tempify is an on demand Dental Temping platform that connects dental offices with dental professionals. 
                    Our goal is to revolutionize the way dental offices address their dental staffing needs. 
                    Tempify is the easiest way to book your ideal dental temp."/>
                <AboutContent 
                content="We understand it can be difficult to find help, particularly when a staff member calls in sick at the last minute. 
                    That is why we pride ourselves on making this process simple. 
                    With a few clicks you can get the right person at your office quick, and easy."/>
                <AboutContent 
                content="Dental offices now have the ability to review profiles of dental professionals in order to find the right fit.
                    We are happy to have created something that makes this whole process easier."/>
                <AboutContent 
                content="Our priority is to put the dental health of patients first.
                We achieve this by ensuring that offices around the Lower Mainland are completely staffed with highly qualified dental professionals.Enjoy."/>
                <Typography align="left" display="block" variant="body1" className="">
                    Pricing : <span className="bold">15% Surcharge</span>
                </Typography>
            </Grid>
        </React.Fragment>
    );
}

export default AboutHeader;