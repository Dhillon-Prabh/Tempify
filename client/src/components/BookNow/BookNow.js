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
import Dashboard from '../Dashboard/Dashboard';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
    textField: {
        width: '100%',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
      label: {
        '&$focused': {
          color: '#00bfff'
        },
      },
      inputlabel: {},
      labelAsterisk: {
        color: '#ff0000'
      },
      focused: {},
      outlinedInput: {
        '&$focused $notchedOutline': {
          border: '1px solid #00bfff'
        },
      },
      oulinedSelect: {
        border: '1px solid #00bfff'
      },
      notchedOutline: {},
      button: {
        margin: theme.spacing(1),
      },
      input: {
        display: 'none',
      },
});

const designations = [
    {
      value: 'Assistant',
      label: 'Assitant',
    },
    {
      value: 'Registered Dental Hygienist',
      label: 'Registered Dental Hygienist',
    },
    {
      value: 'Receptionist',
      label: 'Receptionist',
    },
  ];

class PostGig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            fromTime: '',
            toTime: '',
            designation: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleDateChange = (date) => {
        this.setState({date: date});
    }

    render () {
        const { classes } = this.props;
        return(
            <React.Fragment>
                <Typography variant="h6" align="center" display="block" className="title">POST A GIG</Typography>
                <Grid container direction="row" justify="center" alignItems="center" spacing={1} >
                    <Grid item xs={12} md={2}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                            className="inputBox"
                            name="date"
                            disableToolbar
                            variant="inline"
                            inputVariant="outlined"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date"
                            value={this.state.date}
                            onChange={this.handleDateChange}
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
                        name="fromTime"
                        onChange={this.handleChange}
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
                        name="toTime"
                        onChange={this.handleChange}
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
                    <TextField
                        required
                        fullWidth
                        select
                        name="designation"
                        label="Designation"
                        margin="normal"
                        variant="outlined"
                        value={this.state.designation}
                        onChange={this.handleChange}
                        InputLabelProps={{
                            shrink: true,
                            classes: {
                            root: classes.label,
                            focused: classes.focused,
                            asterisk: classes.labelAsterisk,
                            },
                        }}
                        InputProps={{
                            classes: {
                            root: classes.outlinedInput,
                            focused: classes.focused,
                            notchedOutline: classes.notchedOutline,
                            },
                        }}
                        >
                            {designations.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                    </TextField>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Button className="button">POST A GIG</Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
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
            <Dashboard/>
            <PostGig/>
            <Divider/>
            <FindFit/>
        </React.Fragment>
    );
}

export default withStyles(useStyles)(BookNow);