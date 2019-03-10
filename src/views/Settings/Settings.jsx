import React, { Component } from "react";
import PropTypes from "prop-types";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormControl from "@material-ui/core/FormControl";
import Snackbar from "@material-ui/core/Snackbar";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

import SnackbarContentWrapper from "../../components/Snackbar/CodedSnackbarContents";

import styles from "../../assets/views/Settings/jss/settings-style";
import { connect } from "react-redux";

import changePassword from "../../http/change_password";

class Settings extends Component {
  state = {
    message: "",
    type: "",
    open: false,
    currentPassword: null,
    newPassword: null,
    confirmNewPassword: null
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  onChangePassword = async () => {
    const { loginToken } = this.props;
    const { currentPassword, confirmNewPassword, newPassword } = this.state;

    if (confirmNewPassword === newPassword) {
      const response = await changePassword(
        loginToken,
        currentPassword,
        newPassword
      );

      if (response.status === 200) {
        this.setState({
          message: "Successfully changed password",
          open: true,
          type: "success"
        });
      } else {
        const body = await response.json();
        this.setState({
          message: "Failed: " + body.message,
          open: true,
          type: "error"
        });
      }
    } else {
      this.setState({
        message:
          "Please make sure the confirm password matches the new password",
        open: true,
        type: "error"
      });
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
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
        <Typography
          className={classes.typography}
          variant="subtitle1"
          gutterBottom
        >
          Authentication
        </Typography>
        <ExpansionPanel expanded={true}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Change Password</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <form>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="currentPassword">
                  Current Password
                </InputLabel>
                <Input
                  name="currentPassword"
                  type="password"
                  id="currentPassword"
                  onChange={this.handleChange("currentPassword")}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="newPassword">New Password</InputLabel>
                <Input
                  name="newPassword"
                  type="password"
                  id="newPassword"
                  onChange={this.handleChange("newPassword")}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="confirmNewPassword">
                  Confirm New Password
                </InputLabel>
                <Input
                  name="confirmNewPassword"
                  type="password"
                  id="confirmNewPassword"
                  onChange={this.handleChange("confirmNewPassword")}
                />
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
  };
}

function mapDispatchToProps() {
  return {};
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Settings));
