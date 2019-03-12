import React, { Component } from "react";

import AddIcon from "@material-ui/icons/Add";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import RemoveIcon from "@material-ui/icons/Remove";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";

import Dialogue from "../../components/Dialogue/Dialogue";
import SnackbarContentWrapper from "../../components/Snackbar/CodedSnackbarContents";

import { connect } from "react-redux";
import QrReader from "react-qr-reader";

import offline from "../../assets/views/Home/img/red_circle.png";
import online from "../../assets/views/Home/img/green_circle.png";
import styles from '../../assets/views/Home/jss/home-styles'

import addRobot from '../../actions/add_robot';
import removeRobot from '../../actions/remove_robot';
import renameRobot from '../../actions/rename_robot';
import selectRobot from '../../actions/select_robot';
import fetchRobots from "../../http/fetch_robots";
import httpRenameRobot from "../../http/rename_robot";
import httpRemoveRobot from "../../http/remove_robot";

class Home extends Component {

  state = {
    open: false,
    type: null,
    message: null,
    newRobotSerialKey: null,
    newRobotTitle: null,
    addRobotDialogue: false,
    renameRobotDialogue: false,
    renameRobotTitle: "",
    removeRobotDialogue: false
  };
  handleOpenDialogue = dialogue => {
    this.setState({ [dialogue]: true });
  };
  handleCloseDialogue = dialogue => {
    this.setState({ [dialogue]: false });
  };
  componentDidMount = async () => {
    this.fetchRobots();
  }
  handleListItemClick = (event, robot) => {
    const { reduxSelectRobot } = this.props;
    reduxSelectRobot(robot);
  };
  isRobotOnline = robot => {
    return robot.seen_at !== null;
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  fetchRobots = async() => {
    const { loginToken, reduxAddRobot, reduxRobots } = this.props;
    const fetchRobotsResult = await fetchRobots(loginToken);

    if (fetchRobotsResult instanceof Error) {
      const body = await fetchRobotsResult.json();
      this.setState({ message: body.message, open: true, type: "error" });
    } else {
      const { robots } = fetchRobotsResult;
      const reduxRobotIds = reduxRobots.map(robot => robot.id);
      robots.forEach(robot => {
        if(reduxRobotIds.indexOf(robot.id) < 0) {
          reduxAddRobot(robot);
        }
      });
    }
  };
  onRemoveRobot = async () => {
    const { loginToken, selectedRobot, reduxRemoveRobot } = this.props;

    const response = await httpRemoveRobot(loginToken, selectedRobot.id);

    if (response.status === 200) {
      reduxRemoveRobot(selectedRobot);
      this.setState({
        message: "Successfully removed robot",
        open: true,
        type: "success"
      });
    } else {
      const body = await response.json();
      this.setState({ message: body.message, open: true, type: "error" });
    }
    this.handleCloseDialogue('removeRobotDialogue');

  };
  onAddRobot = async () => {
    const { loginToken, reduxAddRobot } = this.props;
    const { newRobotSerialKey, newRobotTitle } = this.state;
    const response = await addRobot(
      loginToken,
      newRobotSerialKey,
      newRobotTitle
    );

    if (response.status === 200) {
      const fetchRobotsResult = await fetchRobots(loginToken);

      if (fetchRobotsResult instanceof Error) {
        const body = await fetchRobotsResult.json();
        this.setState({ message: body.message, open: true, type: "error" });

      } else {
        const {robots} = fetchRobotsResult;
        robots.forEach(robot => {
          if(robots.indexOf(robot) < 0) {
            reduxAddRobot(robot);
          }
        });
      }
    } else {
      const body = await response.json();
      this.setState({ message: body.message, open: true, type: "error" });
    }
    this.handleCloseDialogue('addRobotDialogue');
  };
  onRenameRobot = async () => {
    const { loginToken, selectedRobot, reduxRenameRobot } = this.props;
    const { renameRobotTitle } = this.state;

    const response = await httpRenameRobot(
      loginToken,
      selectedRobot.id,
      renameRobotTitle
    );

    if (response.status === 200) {
      reduxRenameRobot(selectedRobot, renameRobotTitle);
      this.setState({
        message: "Successfully renamed robot",
        open: true,
        type: "success"
      });
    } else {
      const body = await response.json();
      this.setState({
        message: body.message,
        open: true,
        type: "error"
      });
    }
    this.handleCloseDialogue('renameRobotDialogue');
  };
  createRobotList = () => {
    const { classes, reduxRobots, selectedRobot } = this.props;
    return (
      <List className={classes.root}>
        {reduxRobots.map(robot => (
          <ListItem
            key={robot.id}
            alignItems="flex-start"
            button
            selected={selectedRobot.id === robot.id}
            onClick={event => this.handleListItemClick(event, robot)}
          >
            <ListItemAvatar>
              <Avatar src={this.isRobotOnline(robot) ? online : offline} />
            </ListItemAvatar>
            <ListItemText
              primary={robot.title}
              secondary={
                robot.seen_at === null ? (
                  <React.Fragment>Please start this growbot</React.Fragment>
                ) : (
                  <React.Fragment>
                    {`Charge: ${robot.battery_level}%; Water Volume: ${
                      robot.water_level
                      }ml`}
                  </React.Fragment>
                )
              }
            />
            {selectedRobot.id === robot.id && (
              <React.Fragment>
                <IconButton
                  onClick={() => this.handleOpenDialogue("removeRobotDialogue")}
                >
                  <RemoveIcon />
                </IconButton>
                <IconButton
                  onClick={() => this.handleOpenDialogue("renameRobotDialogue")}
                >
                  <EditIcon />
                </IconButton>
              </React.Fragment>

            )}
          </ListItem>
        ))}
      </List>
    );
  };
  createAddRobotDialogueContent = () => {
    const { newRobotSerialKey, newRobotTitle, qrDelay } = this.state;
    const addRobotSerialKeyTextField = this.createTextField(
      "addRobot",
      "Serial key",
      newRobotSerialKey,
      "newRobotSerialKey"
    );
    const addRobotTitleTextField = this.createTextField(
      "addRobotTitle",
      "Title",
      newRobotTitle,
      "newRobotTitle"
    );

    return (
      <React.Fragment>
        <QrReader
          delay={qrDelay}
          onError={Home.qrHandleError}
          onScan={this.qrHandleScan.bind(this)}
          style={{ width: "100%" }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          {addRobotSerialKeyTextField}
          {addRobotTitleTextField}
        </div>
      </React.Fragment>
    );
  };
  createAddRobotDialogueActions = () => {
    return (
      <React.Fragment>
        <Button onClick={() => this.handleCloseDialogue("addRobotDialogue")}>
          Close
        </Button>
        <Button onClick={this.onAddRobot}>Add</Button>
      </React.Fragment>
    );
  };
  createRemoveRobotDialogueActions = () => {
    return (
      <React.Fragment>
        <Button onClick={() => this.handleCloseDialogue("removeRobotDialogue")}>
          Close
        </Button>
        <Button onClick={this.onRemoveRobot}>Remove</Button>
      </React.Fragment>
    );
  };
  createRemoveRobotDialogueContent = () => {
    return <React.Fragment />;
  };
  createRenameRobotDialogueActions = () => {
    return (
      <React.Fragment>
        <Button onClick={() => this.handleCloseDialogue("renameRobotDialogue")}>
          Close
        </Button>
        <Button onClick={this.onRenameRobot}>Rename</Button>
      </React.Fragment>
    );
  };
  createRenameRobotDialogueContent = () => {
    const { renameRobotTitle } = this.state;

    const renameRobot = this.createTextField(
      "renameRobotTitle",
      "New Name",
      renameRobotTitle,
      "renameRobotTitle"
    );

    return <React.Fragment>{renameRobot}</React.Fragment>;
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  createTextField = (id, label, value, valueName) => this.createTextFieldWithType(id, label, "string", value, valueName);
  createTextFieldWithType = (id, label, type, value, valueName) => {
    const { classes } = this.props;
    return (
      <TextField
        id={id}
        label={label}
        type={type}
        className={type === 'number' ? classes.numberTextField : classes.textField}
        value={value}
        onChange={this.handleChange(valueName)}
        margin="normal"
      />
    );
  };
  qrHandleScan(data) {
    const prefix = "growbot:";
    if (data && data.startsWith(prefix)) {
      this.setState({
        newRobotSerialKey: data.slice(prefix.length)
      });
    }
  }
  static qrHandleError(err) {
    alert(err);
  }
  render() {
    const { classes, reduxRobots } = this.props;
    const { addRobotDialogue, removeRobotDialogue, renameRobotDialogue, open, type, message } = this.state;
    const robotsList = this.createRobotList();
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
        <Dialogue
          open={addRobotDialogue}
          close={() => this.handleCloseDialogue("addRobotDialogue")}
          title="Add Robot"
          contentText="Please scan the robot serial and name your robot."
          content={this.createAddRobotDialogueContent()}
          actions={this.createAddRobotDialogueActions()}
        />
        <Dialogue
          key="removeRobotDialogue"
          open={removeRobotDialogue}
          close={() => this.handleCloseDialogue("removeRobotDialogue")}
          title="Remove Robot"
          contentText="Please confirm you wish to remove the robot."
          content={this.createRemoveRobotDialogueContent()}
          actions={this.createRemoveRobotDialogueActions()}
        />
        <Dialogue
          key="renameRobotDialogue"
          open={renameRobotDialogue}
          close={() => this.handleCloseDialogue("renameRobotDialogue")}
          title="Rename Robot"
          contentText="Rename your robot."
          content={this.createRenameRobotDialogueContent()}
          actions={this.createRenameRobotDialogueActions()}
        />
        <br/>
        <Grid container>
          <Grid item>
            <Card className={classes.card}>

              <CardContent>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <Typography gutterBottom variant="h5" component="h2">
                      Robots
                    </Typography>
                    <Typography component="p">
                      {reduxRobots.length === 0
                        ? "Please add some GrowBots"
                        : "Select a Growbot"}
                    </Typography>
                  </div>
                  <IconButton
                    aria-label="Add-Robot"
                    onClick={() => this.handleOpenDialogue("addRobotDialogue")}
                  >
                    <AddIcon />
                  </IconButton>
                </div>
              </CardContent>

              <CardActions>{robotsList}</CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (props) => {
  const { robots, selectedRobot } = props.robotState;
  const { loginToken } = props.auth;
  return {
    reduxRobots: robots, selectedRobot, loginToken
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reduxAddRobot: robot => dispatch(addRobot(robot)),
    reduxRemoveRobot: robot => dispatch(removeRobot(robot)),
    reduxSelectRobot: robot => dispatch(selectRobot(robot)),
    reduxRenameRobot: (robot, name) => dispatch(renameRobot(robot, name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));