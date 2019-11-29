import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import './Login.css';
import PasswordModal from '../PasswordModal/PasswordModal'
import ContactSection from '../Contact/ContactSection'

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
      switched: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {

    const switched = localStorage.getItem("rememberMe");
    
    if(switched) {
      const user = localStorage.getItem("user");
      const password = localStorage.getItem("password");
      const switched = localStorage.getItem("rememberMe");
     
      this.setState({
        email: user,
        password: password,
        switched: !switched
      })
    } else {
      this.setState({
        email:  '',
        password: '',
        switched: !switched
      })

      localStorage.removeItem("rememberMe");
      localStorage.setItem("user", "");
      localStorage.setItem("password", "");
    }
  }

  handleChange = (event) => {
    this.setState({
      switched: !this.state.switched
    })

    if(!this.state.switched) {
      localStorage.removeItem("rememberMe");
      localStorage.setItem("user", "");
      localStorage.setItem("password", "");
    } else {
      localStorage.setItem("rememberMe", true);
      localStorage.setItem("user", this.state.email);
      localStorage.setItem("password", this.state.password);
    }
  }

  handleSubmit(e) {

    if(!this.state.switched) {
      console.log(!this.state.switched)
      this.setState({ 
        email: this.state.email,
        password: this.state.password,
      })

      localStorage.setItem("rememberMe", !this.state.switched);
      localStorage.setItem("user", this.state.email);
      localStorage.setItem("password", this.state.password);
    }
  }

  updateInputValue(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  render(){

    const { classes } = this.props;
    return (
      <div>
        <Container component="main" maxWidth="sm" className="login_container">
          <div className={classes.paper}>
          <Typography align="center" className="header1">
              LOGIN WITH AN EMAIL ACCOUNT
            </Typography>
            <ValidatorForm ref="form"
              className={classes.form}        
              onSubmit = {e => 
                  this.props.onLogin(e, {
                    email: this.state.email,
                    password: this.state.password
                  }) 
                }>
              <TextValidator
                onChange= {this.updateInputValue}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value= {this.state.email}
                label="Email Address"
                type = "text" 
                name = "email"
                autoComplete="email"
                autoFocus
                className ="classes.loginEmail"
                validators={['required', 'isEmail']}
                errorMessages={['This field is required', 'This is not a valid email']}
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
              <TextValidator
                onChange= {this.updateInputValue}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={this.state.password}
                type = "password" 
                name = "password"
                label="Password"
                id="password"
                autoComplete="current-password"
                className ="loginPassword"
                validators={['required']}
                errorMessages={['This field is required']}
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
                control={<Checkbox value="remember" color="default" checked={!this.state.switched} onClick={this.handleChange}  />}
                label="Remember me"
              />
              <PasswordModal/>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick = {this.handleSubmit}
              >
                LOGIN
              </Button>
            </ValidatorForm>
          </div>
        </Container>
        <ContactSection/>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(LoginTemp);
