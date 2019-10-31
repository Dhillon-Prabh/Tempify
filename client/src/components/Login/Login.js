import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './Login.css';

import PasswordModal from '../PasswordModal/PasswordModal'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 1),
    backgroundColor: "#00bfff",
    display: 'block',
    marginTop: '20px',
    '&:hover': {
      background: "#404040",
    }
  },
  textField: {
    marginLeft: theme.spacing.unit * 3,
    marginBottom: '0px',
  },
  label: {
    '&$focused': {
      color: '#00bfff'
    },
  },
  focused: {},
  outlinedInput: {
    '&$focused $notchedOutline': {
      border: '1px solid #00bfff'
    },
  },
  notchedOutline: {},

}));

export default function Login() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="sm" className="login_container">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" className="login_title">
          LOGIN WITH YOUR EMAIL ACCOUNT
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            className ="classes.loginEmail"
            InputLabelProps={{
              classes: {
                root: classes.label,
                focused: classes.focused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.outlinedInput,
                focused: classes.focused,
                notchedOutline: classes.notchedOutline,
              },
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            className ="loginPassword"
            InputLabelProps={{
              classes: {
                root: classes.label,
                focused: classes.focused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.outlinedInput,
                focused: classes.focused,
                notchedOutline: classes.notchedOutline,
              },
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="default" />}
            label="Remember me"
          />
          <PasswordModal/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            LOGIN
          </Button>

        </form>
      </div>
    </Container>
  );
}