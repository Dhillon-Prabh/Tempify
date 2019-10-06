import React, { Component } from 'react';
import {
  AppBar, Toolbar, Typography, List, ListItem, Grid, SwipeableDrawer
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './Navbar.css';
import logo from '../../images/Tempify_resized.png';

class Navbar extends Component{
  constructor(props){
    super(props);
    this.state = {drawerActivate:false, drawer:false};
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
              <Typography color="inherit" variant = "headline"></Typography>
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
               <ListItem key = {1} button divider className="nav-item item-height"> Home </ListItem>
               <ListItem key = {2} button divider className="nav-item item-height"> About Us </ListItem>
               <ListItem key = {3} button divider className="nav-item item-height"> Book Now </ListItem>
               <ListItem key = {4} button divider className="nav-item item-height"> Become a Temp </ListItem>
               <ListItem key = {5} button divider className="nav-item item-height"> Contact Us </ListItem>
               <ListItem key = {6} button divider className="nav-item item-height"> Login </ListItem>
             </List>

         </div>
       </SwipeableDrawer>

      </div>
    );
  }

  //Larger Screens
  destroyDrawer(){
    return (
      <AppBar>
        <Toolbar className="nav-color">
          <div className="logo-container">
            <img src={logo} className="logo" alt="logo"/>
          </div>
            <Typography variant = "subheading" className = "padding nav-item">Home</Typography>
            <Typography variant = "subheading" className = "padding nav-item">About Us</Typography>
            <Typography variant = "subheading" className = "padding nav-item">Book Now</Typography>
            <Typography variant = "subheading" className = "padding nav-item">Become a Temp</Typography>
            <Typography variant = "subheading" className = "padding nav-item">Contact Us</Typography>
            <Typography variant = "subheading" className = "nav-item">Login</Typography>
        </Toolbar>
      </AppBar>
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