import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';

import SnackbarContentWrapper from "../../components/Snackbar/CodedSnackbarContents"

import styles from '../../assets/views/Settings/jss/settings-style'
import {connect} from "react-redux";
import endpoints from "../../endpoints";

class Settings extends Component {

    state = {
        message: "",
        type: "",
        open: false,
        changeNameRobotId: 'default',
        newRobotName: 'Enter New Name',
        currentPassword: null,
        newPassword: null,
        confirmNewPassword: null,
        robots: []
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    }

    robotsApi = async () => {
        console.log(this.props.isLoginSuccess);
        console.log(this.props.loginToken);
        let response = await fetch(endpoints.robots_list, {
            headers: {
                "Authorization": "Bearer " + this.props.loginToken,
                "Content-Type": "application/json",
            },
        });
        let body = await response.text();

        if (response.status === 200) {
            let data = JSON.parse(body);
            return data;
        }
        return new Error(body);
    }

    componentDidMount = async () => {
        let result = []
        try {

            result = await this.robotsApi();

            if (result instanceof Error) {
                console.log(result.message)
                this.setState({robots: []})
            } else {
                console.log("NOT NULL")
                console.log(result.robots)
                this.setState({robots: result.robots})
            }

            console.log(this.state.robots)

        } catch (e) {
            //set lorem ipsum robots here
        }
    }

    onChangePassword = async () => {
        let {currentPassword, confirmNewPassword, newPassword} = this.state;

        console.log(this.props.loginToken)

        if(confirmNewPassword === newPassword) {
            let changePasswordRequest = {
                old: currentPassword,
                new: newPassword
            }

            let response = await fetch(endpoints.auth_chgpass, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + this.props.loginToken
                },
                body: JSON.stringify(changePasswordRequest)
            });

            if (response.status === 200) {
                this.setState({message: "Successfully changed password", open: true, type: "success"})
            } else {
                console.log(response)
                const body = await response.json();
                console.log(response.status)
                this.setState({message: "Failed: " + body.message, open: true, type: "error"})
            }

        } else {

        }
    }

    handleClose = () => {
        this.setState({open: false})
    }

    render() {
        let {classes} = this.props;
        return (<div className={classes.root}>
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
                <Typography className={classes.typography} variant="subtitle1" gutterBottom>
                    Authentication
                </Typography>
                <ExpansionPanel expanded={true}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Change Password</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <form>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="currentPassword">Current Password</InputLabel>
                                <Input name="currentPassword" type="password" id="currentPassword" onChange={this.handleChange('currentPassword')}/>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="newPassword">New Password</InputLabel>
                                <Input name="newPassword" type="password" id="newPassword" onChange={this.handleChange('newPassword')}/>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="confirmNewPassword">Confirm New Password</InputLabel>
                                <Input name="confirmNewPassword" type="password" id="confirmNewPassword" onChange={this.handleChange('confirmNewPassword')}/>
                            </FormControl>

                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={this.onChangePassword}
                            >
                                Submit
                            </Button>
                        </form>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        isLoginPending: state.auth.isLoginPending,
        isLoginSuccess: state.auth.isLoginSuccess,
        loginError: state.auth.loginError,
        loginToken: state.auth.loginToken
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

Settings.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles)(Settings));