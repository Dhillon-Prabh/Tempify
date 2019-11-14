import React, { Component } from 'react';
import {
  AppBar, Toolbar, Typography, List, ListItem, Grid, SwipeableDrawer
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './Navbar.css';
import logo from '../../images/Tempify_resized.png';
import { NavLink, Link, Route, Switch, withRouter} from "react-router-dom";
import Login from '../Login/Login';
import About from '../About/About';
import Modal from '../Modal/Modal';
import Home from '../Home/Home';
import Dashboard from '../Dashboard/Dashboard'
import TempRegister from '../Register/TempRegister';
import DentalRegister from '../Register/DentalRegister';
import TempProfile from '../Profile/TempProfile';

class Navbar extends Component{

  constructor(props){
    super(props);
    this.state = {
      drawerActivate:false, 
      drawer:false,
      isAuth: false, 
      role: -1,
    };

    this.loginHandler = this.loginHandler.bind(this);
    this.setAutoLogout = this.setAutoLogout.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
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

    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');

    if(!token || !expiryDate) {
      return; 
    }

    if(new Date(expiryDate <= new Date())) {
      this.logoutHandler();
      return; 
    }

    const userId = localStorage.getItem('userId');
    const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime(); 
    
      this.setState({
        isAuth: true, 
        token: token,
        userId: userId
      });

      this.setAutoLogout(remainingMilliseconds);
  }

  loginHandler = (event, authData) => {
    event.preventDefault();
    fetch("http://localhost:3001/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
      })
    }
    )
    .then(res => {
      if(res.status === 422) {
        throw new Error(
          "Validation failed!"
        );
      }
      if(res.status !== 200 && res.status !== 201) {
        throw new Error('Authentication failed!');
      }
      return res.json();
    })
    .then(resData => {

      console.log(resData);
      this.setState({
        isAuth: true, 
        userId: resData.userId,
        role: resData.role,
      });  

      localStorage.setItem('token', resData.token);
      localStorage.setItem('userId', resData.userId);

      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(
        new Date().getTime() + remainingMilliseconds
      );
      localStorage.setItem('expiryDate', expiryDate.toISOString());
      this.setAutoLogout(remainingMilliseconds);
            
      if(this.state.isAuth){
        this.props.history.push("/dashboard");
      }

    })
    .catch(err => {
      this.setState({
        isAuth: false,
        error: err
      });
    });
  };

  logoutHandler() {
    this.setState({
      isAuth: false, 
      token: null,
      role: -1
    })

    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
  }

  setAutoLogout(milliseconds) {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };

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
              <Link to="/home">
                <img src={logo} className="logo" component={NavLink} to={'/home'} alt="logo"/>
              </Link>
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
            
            { this.state.role == -1 && (
              <List className = "list">
                <ListItem key = {1} button divider className="nav-item item-height"
                  activeStyle={{ color: '#53bed5' }} component={NavLink} to={'/home'}> Home </ListItem>
                <ListItem key = {2} button divider className="nav-item item-height"
                  activeStyle={{ color: '#53bed5' }} component={NavLink} to={'/about'}> About Us </ListItem>
                <ListItem key = {3} button divider className="nav-item item-height"> Book Now </ListItem>
                <ListItem key = {4} button divider className="nav-item item-height"
                  activeStyle={{ color: '#53bed5' }} component={NavLink} to={'/register'}> Become a Temp </ListItem>
                <ListItem key = {5} button divider className="nav-item item-height"> Contact Us </ListItem>
                <ListItem key = {6} button divider className="nav-item item-height" 
                  activeStyle={{ color: '#53bed5' }} component={NavLink} to={'/login'}> Login </ListItem>
              </List>)
            }
            { this.state.role == 1 && (
              <List className = "list">
                <ListItem key = {1} button divider className="nav-item item-height"
                  activeStyle={{ color: '#53bed5' }} component={NavLink} to={'/home'}> Home </ListItem>
                <ListItem key = {2} button divider className="nav-item item-height"
                  activeStyle={{ color: '#53bed5' }} component={NavLink} to={'/profile'}> Profile </ListItem>
                <ListItem key = {3} button divider className="nav-item item-height"> Dashboard </ListItem>
                <ListItem key = {6} button divider className="nav-item item-height" 
                  activeStyle={{ color: '#53bed5' }} component={NavLink} to={'/'}> Logout </ListItem>
              </List>)
            }
            { this.state.role == 2 && (
              <List className = "list">
                <ListItem key = {1} button divider className="nav-item item-height"
                  activeStyle={{ color: '#53bed5' }} component={NavLink} to={'/home'}> Home </ListItem>
                <ListItem key = {2} button divider className="nav-item item-height"
                  activeStyle={{ color: '#53bed5' }} component={NavLink} to={'/profile'}> Profile </ListItem>
                <ListItem key = {3} button divider className="nav-item item-height"> Dashboard </ListItem>
                <ListItem key = {4} button divider className="nav-item item-height"
                  activeStyle={{ color: '#53bed5' }} component={NavLink} to={'/'}> Job Postings </ListItem>
                <ListItem key = {5} button divider className="nav-item item-height"> My Availability </ListItem>
                <ListItem key = {6} button divider className="nav-item item-height" 
                  activeStyle={{ color: '#53bed5' }} component={NavLink} to={'/'}> Logout </ListItem>
              </List>)
            }
          </div>
       </SwipeableDrawer> 
      </div>
    );
  }

  //Larger Screens
  destroyDrawer(){
    return (
      <div>
        <AppBar >
          <Toolbar className="nav-color">
            <Link to="/home" className="logo-container">
              <img src={logo} className="logo" alt="logo"/>
            </Link>
            { this.state.role == -1 && (
              <React.Fragment>
                <Typography variant = "subheading" className = "padding nav-item"
                  activeStyle={{ color: '#53bed5' }} component={NavLink} to={'/home'}>Home</Typography>
                <Typography variant = "subheading" className = "padding nav-item"
                  activeStyle={{ color: '#53bed5' }} component={NavLink} to={'/about'}>About Us</Typography>
                <Typography variant = "subheading" className = "padding nav-item"><Modal name="Book Now" idType="typography" link="/dentalregister"/></Typography>
                <Typography variant = "subheading" className = "padding nav-item"><Modal name = "Become a Temp" idType="typography" link="/tempregister"/></Typography>
                <Typography variant = "subheading" className = "padding nav-item">Contact Us</Typography>
                <Typography variant = "subheading" className = "nav-item" 
                  activeStyle={{ color: '#53bed5' }} component={NavLink} to={'/login'}>Login</Typography>
              </React.Fragment>)
            }
            { this.state.role == 1 && (
              <React.Fragment>
                <Typography variant = "subheading" className = "padding nav-item"
                  activeStyle={{ color: '#53bed5' }} component={NavLink} to={'/home'}>Home</Typography>
                <Typography variant = "subheading" className = "padding nav-item"
                  activeStyle={{ color: '#53bed5' }} component={NavLink} to={'/profile'}>Profile</Typography>
                <Typography variant = "subheading" className = "padding nav-item">Dashboard</Typography>
                <Typography variant = "subheading" className = "nav-item" 
                  activeStyle={{ color: '#53bed5' }} component={NavLink} to={'/login'}>Logout</Typography>
              </React.Fragment>)
            }
            { this.state.role == 2 && (
              <React.Fragment>
                <Typography variant = "subheading" className = "padding nav-item"
                  activeStyle={{ color: '#53bed5' }} component={NavLink} to={'/home'}>Home</Typography>
                <Typography variant = "subheading" className = "padding nav-item"
                  activeStyle={{ color: '#53bed5' }} component={NavLink} to={'/profile'}>Profile</Typography>
                <Typography variant = "subheading" className = "padding nav-item"
                  activeStyle={{ color: '#53bed5' }} component={NavLink} to={'/dashboard'}>Dashboard</Typography>
                <Typography variant = "subheading" className = "padding nav-item">Job Postings</Typography>
                <Typography variant = "subheading" className = "padding nav-item">My Availability</Typography>
                <Typography variant = "subheading" className = "nav-item" 
                  activeStyle={{ color: '#53bed5' }} component={NavLink} to={'/login'} onClick ={this.logoutHandler}>Logout</Typography>
              </React.Fragment>)
            }
          </Toolbar>
        </AppBar>
      </div>
    )
  }

  render(){

    let routes = (
      <Switch>
      <Route path='/' exact component={Home} />
      <Route
        path="/login"
        exact
        render= {props => (
          <Login
            {...props}
            onLogin = { this.loginHandler }
          />
        )}
      />
      <Route path="/home" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/tempregister" component={TempRegister} />
      <Route
        path="/dentalregister"
        exact
        render= {props => (
          <DentalRegister
            {...props}
          />
        )}
      />
    </Switch>
    );

    if(this.state.isAuth) {
      routes = (
        <Switch>
          <Route path="/profile" component={TempProfile} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      )
    }

    return(
      <div>
        {this.state.drawerActivate ? this.createDrawer() : this.destroyDrawer()}
        { routes }
      </div>
    );
  }
}

export default withRouter(Navbar);