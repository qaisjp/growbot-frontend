import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';

import styles from '../../assets/views/Settings/jss/settings-style'
import endpoints from "../../endpoints";
import login from "../../actions/login_auth";
import {connect} from "react-redux";

class Settings extends Component {

    state = {
        changeNameRobotName: 'default',
        unregisterRobotName: 'default',
        newRobotSerialKey: '',
        newRobotName: 'Enter New Name'
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    }

    onAddRobot = async () => {
        let addRobotRequest = {
            robot_id: this.state.newRobotSerialKey
        }

        console.log("[TOKEN] " + this.props.loginToken)
        let response = await fetch(endpoints.addRobot, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.props.loginToken
            },
            body: JSON.stringify(addRobotRequest)
        });

        if(response.status === 200) {
            console.log('200')
        } else {
            console.log('not 200')
            console.log(response)
        }
    }

    onRemoveRobot = async () => {
        let removeRobotRequest = {

        }

        let response = await fetch("", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Token": this.props.loginToken
            },
            body: JSON.stringify(removeRobotRequest)
        });

        if(response.status === 200) {

        } else {

        }
    }

    render() {
        let {classes} = this.props;
        return (<div className={classes.root}>
                <Typography className={classes.typography} variant="subtitle1" gutterBottom>
                    Authentication
                </Typography>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Change Password</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <form>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="currentPassword">Current Password</InputLabel>
                                <Input name="currentPassword" type="password" id="currentPassword"/>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="newPassword">New Password</InputLabel>
                                <Input name="newPassword" type="password" id="newPassword"/>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="confirmNewPassword">Confirm New Password</InputLabel>
                                <Input name="confirmNewPassword" type="password" id="confirmNewPassword"/>
                            </FormControl>

                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={() => {
                                }}
                            >
                                Submit
                            </Button>
                        </form>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <Typography className={classes.typography} variant="subtitle1" gutterBottom>
                    Robot
                </Typography>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Change Names</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <form>
                            <FormControl className={classes.selectFormControl} margin="normal">
                                <InputLabel htmlFor="robot">Robot</InputLabel>
                                <Select
                                    native
                                    value={this.state.changeNameRobotName}
                                    onChange={this.handleChange('changeNameRobotName')}
                                    inputProps={{
                                        name: 'robot',
                                        id: 'robot',
                                    }}
                                >
                                    <option value="default">Select Robot</option>
                                    <option value={10}>Robot 1</option>
                                    <option value={20}>Robot 2</option>
                                    <option value={30}>Robot 3</option>
                                </Select>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <TextField
                                    id="newRobotName"
                                    label="New Name"
                                    className={classes.textField}
                                    value={this.state.newRobotName}
                                    onChange={this.handleChange('newRobotName')}
                                    margin="normal"
                                />
                            </FormControl>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={() => {
                                }}
                            >
                                Submit
                            </Button>
                        </form>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Add Robot</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <form>
                            <FormControl className={classes.selectFormControl} margin="normal">
                                <TextField
                                    id="addRobot"
                                    label="Serial key"
                                    className={classes.textField}
                                    value={this.state.newRobotSerialKey}
                                    onChange={this.handleChange('newRobotSerialKey')}
                                    margin="normal"
                                />
                            </FormControl>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={this.onAddRobot}
                            >
                                Register
                            </Button>
                        </form>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Remove Robot</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <form>
                            <FormControl className={classes.selectFormControl} margin="normal">
                                <InputLabel htmlFor="robot">Robot</InputLabel>
                                <Select
                                    native
                                    value={this.state.unregisterRobotName}
                                    onChange={this.handleChange('unregisterRobotName')}
                                    inputProps={{
                                        name: 'robot',
                                        id: 'robot',
                                    }}
                                >
                                    <option value="default">Select Robot</option>
                                    <option value={10}>Robot 1</option>
                                    <option value={20}>Robot 2</option>
                                    <option value={30}>Robot 3</option>
                                </Select>
                            </FormControl>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={() => {
                                }}
                            >
                                Unregister
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