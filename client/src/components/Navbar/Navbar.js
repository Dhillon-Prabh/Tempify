import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, Toolbar, Typography, List, ListItem,
  withStyles, Grid, SwipeableDrawer
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const styleSheet = {
  list : {
    width : 200,
  },
  padding : {
    paddingRight : 30,
    cursor : "pointer",
  },

  sideBarIcon : {
    padding : 0,
    color : "white",
    cursor : "pointer",
  }
}

class Navbar extends Component{
  constructor(props){
    super(props);
    this.state = {drawerActivate:false, drawer:false};
    this.createDrawer = this.createDrawer.bind(this);
    this.destroyDrawer = this.destroyDrawer.bind(this);
  }

  componentWillMount(){
    if(window.innerWidth <= 600){
      this.setState({drawerActivate:true});
    }

    window.addEventListener('resize',()=>{
      if(window.innerWidth <= 600){
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
          <Toolbar>
            <Grid container direction = "row" justify = "space-between" alignItems="center">
              <MenuIcon
                className = {this.props.classes.sideBarIcon}
                onClick={()=>{this.setState({drawer:true})}} />

              <Typography color="inherit" variant = "headline">Title</Typography>
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

            <List className = {this.props.classes.list}>
               <ListItem key = {1} button divider> Home </ListItem>
               <ListItem key = {2} button divider> About Us </ListItem>
               <ListItem key = {3} button divider> Book Now </ListItem>
               <ListItem key = {4} button divider> Become a Temp </ListItem>
               <ListItem key = {5} button divider> Contact Us </ListItem>
               <ListItem key = {6} button divider> Login </ListItem>
             </List>

         </div>
       </SwipeableDrawer>

      </div>
    );
  }

  //Larger Screens
  destroyDrawer(){
    const {classes} = this.props
    return (
      <AppBar>
        <Toolbar>
          <Typography variant = "headline" style={{flexGrow:1}} color="inherit" >Title</Typography>
          <Typography variant = "subheading" className = {classes.padding} color="inherit" >Home</Typography>
          <Typography variant = "subheading" className = {classes.padding} color="inherit" >About Us</Typography>
          <Typography variant = "subheading" className = {classes.padding} color="inherit" >Book Now</Typography>
          <Typography variant = "subheading" className = {classes.padding} color="inherit" >Become a Temp</Typography>
          <Typography variant = "subheading" className = {classes.padding} color="inherit" >Contact Us</Typography>
          <Typography variant = "subheading" className = {classes.padding} color="inherit" >Login</Typography>
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

Navbar.propTypes = {
  classes : PropTypes.object.isRequired
};



export default withStyles(styleSheet)(Navbar);