import React from 'react';
import './Dashboard.css';
import { Grid } from '@material-ui/core';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SvgIcon from '@material-ui/core/SvgIcon';
import BookNow from '../BookNow/BookNow';
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
                <Grid item xs={12} md={3}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/home" style={{textDecoration:'none', color: 'inherit'}}>
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
                <Grid item xs={12} md={3}>
                    <ButtonGroup fullWidth aria-label="full width outlined button group" className="buttons">
                        <Button className="button">Book Now</Button>
                        <Button className="button">Schedule</Button>
                        <Button className="button">History</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
            <BookNow/>
        </React.Fragment>
    );
}

export default DashboardOptions;

