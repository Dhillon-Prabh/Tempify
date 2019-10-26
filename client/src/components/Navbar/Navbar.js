import React, { Component } from 'react';
import {
  AppBar, Toolbar, Typography, List, ListItem, Grid, SwipeableDrawer
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './Navbar.css';
import logo from '../../images/Tempify_resized.png';
import { NavLink, Route, Switch} from "react-router-dom";
import Login from '../Login/Login';
import About from '../About/About';
import Modal from '../Modal/Modal';
import Home from '../Home/Home';

class Navbar extends Component{

  constructor(props){
    super(props);
    this.state = {
      drawerActivate:false, 
      drawer:false,
      name: "Book Now"
    };
  }

  componentWillMount(){
    if(window.innerWidth <= 900){
      this.setState({drawerActivate:true});
    }

    window.addEventListener('resize',()=>{
      if(window.innerWidth <= 900){
        this.setState({drawerActivate:true});
      }
      else{
        this.setState({drawerActivate:false})
      }
    });
  }

  //Small Screens
  createDrawer(){
    return (
      <div>
        <AppBar >
          <Toolbar className="nav-color">
            <Grid container direction = "row" justify = "space-between" alignItems="center">
              <MenuIcon
                className = "sideBarIcon"
                onClick={()=>{this.setState({drawer:true})}} />

              <img src={logo} className="logo" alt="logo"/>
              <Typography color="inherit"></Typography>
            </Grid>
          </Toolbar>
        </AppBar>

        <SwipeableDrawer
         open={this.state.drawer}
         onClose={()=>{this.setState({drawer:false})}}
         onOpen={()=>{this.setState({drawer:true})}}>

          <div
            tabIndex={0}
            role="button"
            onClick={()=>{this.setState({drawer:false})}}
            onKeyDown={()=>{this.setState({drawer:false})}}>

            <List className = "list">
              <ListItem key = {1} button divider className="nav-item item-height"
                activeStyle={{ color: '#53bed5' }} component={NavLink} to={'/home'}> Home </ListItem>
              <ListItem key = {2} button divider className="nav-item item-height"
                activeStyle={{ color: '#53bed5' }} component={NavLink} to={'/about'}> About Us </ListItem>
              <ListItem key = {3} button divider className="nav-item item-height"> Book Now </ListItem>
              <ListItem key = {4} button divider className="nav-item item-height"> Become a Temp </ListItem>
              <ListItem key = {5} button divider className="nav-item item-height"> Contact Us </ListItem>
              <ListItem key = {6} button divider className="nav-item item-height" 
                activeStyle={{ color: '#53bed5' }} component={NavLink} to={'/login'}> Login </ListItem>
            </List>
          </div>
       </SwipeableDrawer> 
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    );
  }

  //Larger Screens
  destroyDrawer(){
    return (
      <div>
        <AppBar >
          <Toolbar className="nav-color">
            <div className="logo-container">
              <img src={logo} className="logo" alt="logo"/>
            </div>
              <Typography variant = "subheading" className = "padding nav-item"
                activeStyle={{ color: '#53bed5' }} component={NavLink} to={'/home'}>Home</Typography>
              <Typography variant = "subheading" className = "padding nav-item"
                activeStyle={{ color: '#53bed5' }} component={NavLink} to={'/about'}>About Us</Typography>
              <Typography variant = "subheading" className = "padding nav-item"><Modal name="Book Now"/></Typography>
              <Typography variant = "subheading" className = "padding nav-item"><Modal name = "Become a Temp"/></Typography>
              <Typography variant = "subheading" className = "padding nav-item">Contact Us</Typography>
              <Typography variant = "subheading" className = "nav-item" 
                activeStyle={{ color: '#53bed5' }} component={NavLink} to={'/login'}>Login</Typography>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    )
  }

  render(){
    return(
      <div>
        {this.state.drawerActivate ? this.createDrawer() : this.destroyDrawer()}
      </div>
    );
  }
}

export default Navbar;
