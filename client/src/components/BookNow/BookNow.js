import React from 'react';
import './BookNow.css';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

const PostGig = () => {
    const [values, setValues] = React.useState({
        date: new Date(),
        designation: '',
      });
    
    const inputLabel = React.useRef(null);

    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);
    
    const handleDateChange = date => {
        setValues(oldValues => ({
            ...oldValues,
            date : date,
        }));
    }
    const handleChange = (event, index, value) => {
        setValues(oldValues => ({
        ...oldValues,
        designation: value,
        }));
    };

    return(
        <React.Fragment>
            <Typography variant="h6" align="center" display="block" className="title">POST A GIG</Typography>
            <Grid container direction="row" justify="center" alignItems="center" spacing={1} >
                <Grid item xs={12} md={2}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                        className="inputBox"
                        disableToolbar
                        variant="inline"
                        inputVariant="outlined"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date"
                        value={values.date}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        />
                     </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} md={1}>
                <TextField
                    label="From"
                    type="time"
                    defaultValue="07:30"
                    InputLabelProps={{
                    shrink: true,
                    }}
                    inputProps={{
                    step: 900, // 15 min
                    }}
                />
                </Grid>
                <Grid item xs={12} md={1}>
                <TextField
                    label="To"
                    type="time"
                    defaultValue="07:30"
                    InputLabelProps={{
                    shrink: true,
                    }}
                    inputProps={{
                    step: 900, //15 min
                    }}
                />
                </Grid>
                <Grid item xs={12} md={2}>
                    <FormControl variant="outlined" className="inputBox">
                        <InputLabel ref={inputLabel}>
                            Designation
                        </InputLabel>
                        <Select
                        value={values.designation}
                        onChange={handleChange}
                        labelWidth={labelWidth}
                        inputProps={{
                            name: 'Designation',
                            id: 'outlined-age-simple',
                        }}
                        >
                            <MenuItem value={1}>Assistant</MenuItem>
                            <MenuItem value={2}>Registered Dental Hygienist</MenuItem>
                            <MenuItem value={3}>Receptionist</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button className="button">POST A GIG</Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

const FindFit = () => {
    const [values, setValues] = React.useState({
        date: new Date(),
        designation: '',
      });
    
    const inputLabel = React.useRef(null);

    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);
    
    const handleDateChange = date => {
        setValues(oldValues => ({
            ...oldValues,
            date : date,
        }));
    }
    const handleChange = (event, index, value) => {
        setValues(oldValues => ({
          ...oldValues,
          designation: value,
        }));
      };
    return(
        <React.Fragment>
            <Typography variant="h6" align="center" display="block" className="title">FIND THE RIGHT FIT</Typography>
            <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                <Grid item xs={12} md={3}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        inputVariant="outlined"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date"
                        value={values.date}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        />
                     </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormControl variant="outlined" className="inputBox">
                        <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                            Designation
                        </InputLabel>
                        <Select
                        value={values.designation}
                        onChange={handleChange}
                        labelWidth={labelWidth}
                        inputProps={{
                            name: 'Designation',
                            id: 'outlined-age-simple',
                        }}
                        >
                            <MenuItem value={1}>Assistant</MenuItem>
                            <MenuItem value={2}>Registered Dental Hygienist</MenuItem>
                            <MenuItem value={3}>Receptionist</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button className="button">SEARCH FOR TEMP</Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

const BookNow = () => {
    return (
        <React.Fragment>
            <PostGig/>
            <Divider/>
            <FindFit/>
        </React.Fragment>
    );
}

export default BookNow;