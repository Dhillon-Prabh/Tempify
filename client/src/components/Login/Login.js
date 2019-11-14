import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './Login.css';
import PasswordModal from '../PasswordModal/PasswordModal'

const styles = theme => ({
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
    width: '100%',
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

});

class LoginTemp extends Component {

  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      loginError: this.props.error
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
  }

  handleSubmit(e) {
    this.setState({ 
      message: 'Sending...',
      submitted: true
    }, 
      this.submitFormData);
  }

  updateInputValue(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }



  render(){

    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="sm" className="login_container">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" className="login_title">
            LOGIN WITH YOUR EMAIL ACCOUNT
          </Typography>
          <form 
            className={classes.form}        
            onSubmit = {e => 
                this.props.onLogin(e, {
                  email: this.state.email,
                  password: this.state.password
                }) 
              }>
            <TextField
              onChange= {this.updateInputValue}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              type = "text" 
              name = "email"
              autoComplete="email"
              autoFocus
              className ="classes.loginEmail"
              error={this.props.loginError}
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
              onChange= {this.updateInputValue}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type = "password" 
              name = "password"
              label="Password"
              id="password"
              autoComplete="current-password"
              className ="loginPassword"
              error={this.props.loginError}
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
}

export default withStyles(styles, { withTheme: true })(LoginTemp);
