import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Toolbar } from '@material-ui/core';
import { Link, Route, Switch} from "react-router-dom";
import Login from '../Login/Login'
import App from '../App/App'




class Navbar extends React.Component {

    render() {
        return (
            <div>
                <AppBar position='static'>
                    <Toolbar>
                        <Tabs>
                            <Tab label="Home"/>
                            <Tab label="About Us" value="/about"/>
                            <Tab label="Book Now"/>
                            <Tab label="Become a Temp"/>
                            <Tab label="Contact Us"/>
                            <Tab label="Login" value='/login' component={Link} to={'/login'}  />
                        </Tabs>
                    </Toolbar>
                </AppBar>

                <Switch>
                    <Route path="/login" component={Login} />
                </Switch>
            </div> 
        )
    }
}

export default Navbar;