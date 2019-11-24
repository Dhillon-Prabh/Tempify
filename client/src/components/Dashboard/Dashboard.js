import React from 'react';
import './Dashboard.css';
import { Grid } from '@material-ui/core';
import {Link, NavLink} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SvgIcon from '@material-ui/core/SvgIcon';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
}

const DashboardOptions = () => {
    return(
        <React.Fragment>
            <Grid container direction="row" justify="center" alignItems="center" className="options">
<<<<<<< HEAD
                <Grid item xs={12} md={3} >
=======
                <Grid item xs={2}>
>>>>>>> 405ba7dffc20d496f48f80b4a996ca76aed7c47d
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/" style={{textDecoration:'none', color: 'inherit'}}>
                            <ListItem button>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItem>
                        </Link>
                        <Typography color="textPrimary">dashboard</Typography>
                    </Breadcrumbs>
                </Grid>
                <Grid item xs={6}>
                    <ButtonGroup fullWidth aria-label="full width outlined button group" className="buttons">
                        <Button className="button" activeStyle={{ backgroundColor: "#FFFFFF !important"}} 
                            component={NavLink} to={'/bookNow'}>Book Now</Button>
                        <Button className="button" activeStyle={{ backgroundColor: '#000000 !important' }} 
                            component={NavLink} to={'/schedule'}>Schedule</Button>
                        <Button className="button"  activeStyle={{ backgroundColor: '#000000 !important'}} 
                            component={NavLink} to={'/history'}>History</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default DashboardOptions;

