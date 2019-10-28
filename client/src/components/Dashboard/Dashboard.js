import React from 'react';
import './Dashboard.css';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SvgIcon from '@material-ui/core/SvgIcon';

function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
}

const DashboardOptions = () => {
    return(
        <Grid container direction="row" alignItems="center" justify="center" className="options">
            <Grid item alignContent="center">
                <HomeIcon />
            </Grid>
            <Grid item alignContent="center">
                <Typography> Home</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
                <ButtonGroup fullWidth aria-label="full width outlined button group" className="buttons">
                    <Button className="button">Book Now</Button>
                    <Button className="button">Schedule</Button>
                    <Button className="button">History</Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    );
}

export default DashboardOptions;

