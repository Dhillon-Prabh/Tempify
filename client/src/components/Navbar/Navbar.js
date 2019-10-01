import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Toolbar } from '@material-ui/core';

class Navbar extends React.Component {
    render() {
        return (
            <AppBar position='static'>
                <Toolbar>
                    <Tabs>
                        <Tab label="Home"/>
                        <Tab label="About Us" value="/about"/>
                        <Tab label="Book Now"/>
                        <Tab label="Become a Temp"/>
                        <Tab label="Contact Us"/>
                        <Tab label="Login"/>
                    </Tabs>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Navbar;