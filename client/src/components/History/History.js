import React from 'react';
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

import ProfileCard from '../ProfileCard/ProfileCard';

const useStyles = makeStyles(theme => ({
  formControl: {
    marginTop: 8,
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  fitContent: {
      width: 'fit-content',
  },
  filterButton: {
      width: 70,
      height: 56,
      marginTop: 8,
  }
}));

export default function NativeSelects() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        filter: ''
    });

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleChange = name => event => {
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    return (
        <div>
            <Grid justify='center'>
                <Container className={classes.fitContent}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel ref={inputLabel} >
                            Filter
                        </InputLabel>
                        <Select
                            native
                            value={state.filter}
                            onChange={handleChange('filter')}
                            labelWidth={labelWidth}
                            inputProps={{
                                name: 'filter',
                            }}
                        >
                            <option value="all">All</option>
                            <option value="pending">Pending</option>
                            <option value="booked">Booked</option>
                            <option value="chargesDue">Charges Due</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="expired">Expired</option>
                        </Select>
                    </FormControl>
                    <Button variant="outlined" className={classes.filterButton}>Filter</Button>
                </Container>
            </Grid>
            <Grid>
                <ProfileCard/>
            </Grid>
        </div>
    );
}