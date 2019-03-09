import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Snackbar from '@material-ui/core/Snackbar';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import SnackbarContentWrapper from "../../components/Snackbar/CodedSnackbarContents"

import styles from '../../assets/views/Login/login-style'
import login from '../../actions/login'
import refreshToken from '../../actions/refresh_token'
import nullifyLoginError from '../../actions/close_dialog'

class Login extends Component {

    state = {
        email: null,
        password: null
    }

    componentDidMount = () => {
        const token = localStorage.getItem("loginToken");
        if (token !== null) {
            this.props.authRefresh(token);
        }
    }

    isLoginErroneous = (loginError) => {
        return loginError !== null
    }

    handleClose = () => {
        this.props.resetLoginError()
    }

    onLogin = () => {
        this.props.authLogin(this.state.email, this.state.password)
    }

    onKeyPress = (e) => {
        if (e.key === "Enter") {
            this.onLogin();
        }
    }

    render() {
        let { classes, loginError } = this.props;

        return (
            <main className={classes.main}>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.isLoginErroneous(loginError)}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                >
                    <SnackbarContentWrapper
                        onClose={this.handleClose}
                        variant={"error"}
                        message={loginError}
                    />
                </Snackbar>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input id="email" name="email" autoComplete="email" onChange={e => this.setState({email: e.target.value})} autoFocus />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                name="password" type="password" id="password"
                                onChange={e => this.setState({password: e.target.value})} autoComplete="current-password"
                                onKeyPress={this.onKeyPress.bind(this)}
                            />
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.onLogin.bind(this)}
                        >
                            Sign in
                        </Button>
                        <br/>
                        <br/>
                        <Typography>
                            <Link component={RouterLink} to="/register" className={classes.link}>
                                Register
                            </Link>
                            <Link component={RouterLink} to="/recover" className={classes.link}>
                                Forgot Your Password
                            </Link>
                        </Typography>
                    </form>
                </Paper>
            </main>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoginPending: state.auth.isLoginPending,
        isLoginSuccess: state.auth.isLoginSuccess,
        loginError: state.auth.loginError
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authRefresh: token => dispatch(refreshToken(token)),
        authLogin: (email, password) => dispatch(login(email, password)),
        resetLoginError: _ => dispatch(nullifyLoginError())
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles)(Login));