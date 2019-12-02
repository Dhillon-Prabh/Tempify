import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

/**
 * This button is used by the temps on the modal from events to add in the hours for a completed job
 * @author Oscar Au
 * @author Prabhdeep Singh
 * @version 1
 */

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function ContainedButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary">
        Request Payment
      </Button>
    </div>
  );
}