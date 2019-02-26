import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Snackbar from '@material-ui/core/Snackbar';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import SnackbarContentWrapper from "../../components/Snackbar/CodedSnackbarContents"

import styles from '../../assets/views/Register/register-style'


import endpoints from "../../endpoints";
import login from "../../actions/login_auth";
import {connect} from "react-redux";

class Register extends Component {

    state = {
        forename: null,
        surname: null,
        email: null,
        password: null,
        confirmPassword: null,
        message: null,
        open: false,
        type: null
    }

    onRegister = async () => {
        let registrationRequest = {
            email: this.state.email,
            password: this.state.password,
            forename: this.state.forename,
            surname: this.state.surname
        }
        if (this.state.password === this.state.confirmPassword) {
            let response = await fetch(endpoints.register, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(registrationRequest)
            });
            if (response.status === 200) {
                this.props.authLogin(this.state.email, this.state.password);
                //this.setState({message: "Successfully Registered", open: true, type: "success"})
            } else {
                this.setState({message: "Failed with error code " + response.status, open: true, type: "error"})
            }
        } else {
            this.setState({message: "Please check the passwords match!", open: true, type: "error"})
        }
    }

    handleClose = () => {
        this.setState({open: false})
    }

    render() {
        const {classes} = this.props;
        return (
            <main className={classes.main}>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                >
                    <SnackbarContentWrapper
                        onClose={this.handleClose}
                        variant={this.state.type}
                        message={this.state.message}
                    />
                </Snackbar>
                <CssBaseline/>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <form className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="forename">Forename</InputLabel>
                            <Input name="forename" type="forename" id="forname"
                                   onChange={e => this.setState({forename: e.target.value})}/>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="surname">Surname</InputLabel>
                            <Input name="surname" type="surname" id="surname"
                                   onChange={e => this.setState({surname: e.target.value})}/>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input id="email" name="email" autoComplete="email" autoFocus
                                   onChange={e => this.setState({email: e.target.value})}/>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" type="password" id="password"
                                   onChange={e => this.setState({password: e.target.value})}/>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="confirm_password">Confirm Password</InputLabel>
                            <Input name="confirm_password" type="password" id="confirm_password"
                                   onChange={e => this.setState({confirmPassword: e.target.value})}/>
                        </FormControl>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.onRegister}
                        >
                            Register
                        </Button>
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
        authLogin: (email, password) => dispatch(login(email, password)),
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles)(Register));