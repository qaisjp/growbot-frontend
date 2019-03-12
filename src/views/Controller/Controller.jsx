import React, {Component} from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";

import styles from "../../assets/views/Controller/jss/controller-styles";

import Gamepad from "../../components/Gamepad/Gamepad";
import SnackbarContentWrapper from "../../components/Snackbar/CodedSnackbarContents";

import { withStyles } from "@material-ui/core";

import { connect } from "react-redux";

import moveRobot from "../../http/move_robot";
import endpoints from "../../endpoints";

class Controller extends Component {
  state = {
    open: false,
    type: "",
    message: "",
  };
  onMove = async direction => {
    const { loginToken, selectedRobot } = this.props;
    const response = await moveRobot(loginToken, direction, selectedRobot.id);

    if (response.status === 200) {
      this.setState({
        message: "Successfully moved robot",
        open: true,
        type: "success"
      });
    } else {
      const body = await response.json();
      this.setState({ message: body.message, open: true, type: "error" });
    }
  };
  createGamepad = () => {
    return (
      <Gamepad
        forward={this.onMove.bind(this, "forward")}
        backward={this.onMove.bind(this, "backward")}
        armdown={this.onMove.bind(this, "armdown")}
        armup={this.onMove.bind(this, "armup")}
        left={this.onMove.bind(this, "left")}
        right={this.onMove.bind(this, "right")}
        brake={this.onMove.bind(this, "brake")}
      />
    );
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const {classes, selectedRobot, loginToken} = this.props;
    const {open,type,message} = this.state;
    const gamepad = this.createGamepad();
    return (
      <div className={classes.root}>
        <Snackbar
          key="snackbar"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={open}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <SnackbarContentWrapper
            onClose={this.handleClose}
            variant={type}
            message={message}
          />
        </Snackbar>
        <br />
        <Grid container>
          <Grid item>
            <Card className={classes.card}>

              <CardContent>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <Typography gutterBottom variant="h5" component="h2">
                      {selectedRobot.title}
                    </Typography>
                    <Typography component="p">Move Growbot around.</Typography>
                  </div>
                </div>
              </CardContent>
              <CardActions>{gamepad}</CardActions>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.card}>

              <CardContent>
                <div>
                  <Typography gutterBottom variant="h5" component="h2">
                    Video
                  </Typography>
                  <Typography component="p">
                    Live stream from {selectedRobot.title}
                  </Typography>
                </div>

                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    alt="Video stream"
                    src={endpoints.robot_video(selectedRobot.id, loginToken)}
                  />
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>);
  }
}

const mapStateToProps = props => {
  const { selectedRobot } = props.robotState;
  const { loginToken } = props.auth;
  return {
    selectedRobot,
    loginToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Controller));

