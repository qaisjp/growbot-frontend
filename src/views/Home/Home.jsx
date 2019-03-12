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
import styles from "../../assets/views/Home/jss/home-styles";

import addRobot from "../../actions/add_robot";
import removeRobot from "../../actions/remove_robot";
import renameRobot from "../../actions/rename_robot";
import selectRobot from "../../actions/select_robot";
import fetchRobots from "../../http/fetch_robots";
import fetchPlants from "../../http/fetch_plants";
import addPlant from "../../http/add_plant";
import renamePlant from "../../http/rename_plant";
import removePlant from "../../http/remove_plant";
import httpAddRobot from "../../http/add_robot";
import httpRenameRobot from "../../http/rename_robot";
import httpRemoveRobot from "../../http/remove_robot";

class Home extends Component {
  state = {
    open: false,
    type: "",
    message: "",
    newRobotSerialKey: "",
    newRobotTitle: "",
    addRobotDialogue: false,
    renameRobotDialogue: false,
    renameRobotTitle: "",
    newPlantName: "",
    renamePlantName: "",
    removeRobotDialogue: false,
    addPlantDialogue: false,
    renamePlantDialogue: false,
    removePlantDialogue: false,
    selectedPlant: {},
    plants: []
  };
  handleOpenDialogue = dialogue => {
    this.setState({ [dialogue]: true });
  };
  handleCloseDialogue = dialogue => {
    this.setState({ [dialogue]: false });
  };
  componentDidMount = async () => {
    this.fetchRobots();
    this.fetchPlants();
  };
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
  fetchRobots = async () => {
    const { loginToken, reduxAddRobot, reduxRobots } = this.props;
    const fetchRobotsResult = await fetchRobots(loginToken);

    if (fetchRobotsResult instanceof Error) {
      this.setState({ message: fetchRobotsResult, open: true, type: "error" });
    } else {
      const { robots } = fetchRobotsResult;
      const reduxRobotIds = reduxRobots.map(robot => robot.id);
      robots.forEach(robot => {
        if (reduxRobotIds.indexOf(robot.id) < 0) {
          reduxAddRobot(robot);
        }
      });
    }
  };
  fetchPlants = async () => {
    const { loginToken } = this.props;
    const fetchPlantsResult = await fetchPlants(loginToken);

    if (fetchPlantsResult instanceof Error) {
      this.setState({ message: fetchPlantsResult, open: true, type: "error" });
    } else {
      const { plants } = fetchPlantsResult;
      this.setState({ plants });
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
    this.handleCloseDialogue("removeRobotDialogue");
  };
  onRenamePlant = async () => {
    const { loginToken } = this.props;
    const { selectedPlant, renamePlantName } = this.state;

    const response = await renamePlant(
      loginToken,
      selectedPlant.id,
      renamePlantName
    );

    if (response.status === 200) {
      const result = await fetchPlants(loginToken);

      if (result instanceof Error) {
        this.setState({ robots: [] });
      } else {
        this.setState({
          plants: result.plants,
          message: (await response.json()).message,
          open: true,
          type: "success"
        });
      }
    } else {
      this.setState({
        message: (await response.json()).message,
        open: true,
        type: "error"
      });
    }
    this.handleCloseDialogue("renamePlantDialogue");
  };
  onRemovePlant = async () => {
    const { loginToken } = this.props;
    const { selectedPlant } = this.state;

    const response = await removePlant(loginToken, selectedPlant.id);

    if (response.status === 200) {
      const result = await fetchPlants(loginToken);

      if (result instanceof Error) {
        this.setState({ robots: [] });
      } else {
        this.setState({
          plants: result.plants,
          message: (await response.json()).message,
          open: true,
          type: "success"
        });
      }
    } else {
      this.setState({
        message: (await response.json()).message,
        open: true,
        type: "error"
      });
    }
    this.handleCloseDialogue("removePlantDialogue");
  };
  onAddRobot = async () => {
    const { loginToken, reduxAddRobot } = this.props;
    const { newRobotSerialKey, newRobotTitle } = this.state;
    const response = await httpAddRobot(
      loginToken,
      newRobotSerialKey,
      newRobotTitle
    );

    if (response.status === 200) {
      const fetchRobotsResult = await fetchRobots(loginToken);

      if (fetchRobotsResult instanceof Error) {
        this.setState({
          message: fetchRobotsResult,
          open: true,
          type: "error"
        });
      } else {
        const { robots } = fetchRobotsResult;
        robots.forEach(robot => {
          if (robots.indexOf(robot) < 0) {
            reduxAddRobot(robot);
          }
        });
      }
    } else {
      const body = await response.json();
      this.setState({ message: body.message, open: true, type: "error" });
    }
    this.handleCloseDialogue("addRobotDialogue");
  };
  onAddPlant = async () => {
    const { loginToken } = this.props;
    const { newPlantName } = this.state;
    const response = await addPlant(
      loginToken,
      newPlantName
    );

    if (response.status === 200) {
      const fetchPlantsResult = await fetchPlants(loginToken);

      if (fetchPlantsResult instanceof Error) {
        this.setState({
          message: fetchPlantsResult,
          open: true,
          type: "error"
        });
      } else {
        const { plants } = fetchPlantsResult;
        this.setState({plants});
      }
    } else {
      this.setState({ message: response, open: true, type: "error" });
    }
    this.handleCloseDialogue("addPlantDialogue");
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
    this.handleCloseDialogue("renameRobotDialogue");
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
  createPlantList = () => {
    const { plants } = this.state;
    const { classes } = this.props;
    return (
      <List className={classes.root}>
        {plants.map((plant, idx) => (
          <ListItem key={plant.id} alignItems="flex-start">
            <ListItemText primary={plant.name} />
            <IconButton
              onClick={() =>
                this.setState({
                  selectedPlant: plants[idx],
                  removePlantDialogue: true
                })
              }
            >
              <RemoveIcon />
            </IconButton>
            <IconButton
              onClick={() =>
                this.setState({
                  selectedPlant: plants[idx],
                  renamePlantDialogue: true
                })
              }
            >
              <EditIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    );
  };
  createRenamePlantDialogueContent = () => {
    const { renamePlantName } = this.state;

    const renameRobot = this.createTextField(
      "renamePlantName",
      "New Name",
      renamePlantName,
      "renamePlantName"
    );

    return <React.Fragment>{renameRobot}</React.Fragment>;
  };
  createRenamePlantDialogueActions = () => {
    return (
      <React.Fragment>
        <Button onClick={() => this.handleCloseDialogue("renamePlantDialogue")}>
          Close
        </Button>
        <Button onClick={this.onRenamePlant}>Rename</Button>
      </React.Fragment>
    );
  };
  createAddPlantDialogueContent = () => {
    const { newPlantName } = this.state;

    const addPlant = this.createTextField(
      "newPlantName",
      "Name",
      newPlantName,
      "newPlantName"
    );

    return <React.Fragment>{addPlant}</React.Fragment>;
  };
  createAddPlantDialogueActions = () => {
    return (
      <React.Fragment>
        <Button onClick={() => this.handleCloseDialogue("addPlantDialogue")}>
          Close
        </Button>
        <Button onClick={this.onAddPlant}>Add</Button>
      </React.Fragment>
    );
  };
  createRemovePlantDialogueActions = () => {
    return (
      <React.Fragment>
        <Button onClick={() => this.handleCloseDialogue("removePlantDialogue")}>
          Close
        </Button>
        <Button onClick={this.onRemovePlant}>Remove</Button>
      </React.Fragment>
    );
  };
  createRemovePlantDialogueContent = () => {
    return <React.Fragment />;
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
  createTextField = (id, label, value, valueName) =>
    this.createTextFieldWithType(id, label, "string", value, valueName);
  createTextFieldWithType = (id, label, type, value, valueName) => {
    const { classes } = this.props;
    return (
      <TextField
        id={id}
        label={label}
        type={type}
        className={
          type === "number" ? classes.numberTextField : classes.textField
        }
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
    const {
      addRobotDialogue,
      removeRobotDialogue,
      renameRobotDialogue,
      renamePlantDialogue,
      removePlantDialogue,
      addPlantDialogue,
      open,
      type,
      message
    } = this.state;
    const robotsList = this.createRobotList();
    const plantsList = this.createPlantList();
    return (
      <main>
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
        <Dialogue
          key="renamePlantDialogue"
          open={renamePlantDialogue}
          close={() => this.handleCloseDialogue("renamePlantDialogue")}
          title="Rename Plant"
          contentText="Rename your plant."
          content={this.createRenamePlantDialogueContent()}
          actions={this.createRenamePlantDialogueActions()}
        />
        <Dialogue
          key="removePlantDialogue"
          open={removePlantDialogue}
          close={() => this.handleCloseDialogue("removePlantDialogue")}
          title="Remove Plant"
          contentText="Please confirm that you want to remove this plant."
          content={this.createRemovePlantDialogueContent()}
          actions={this.createRemovePlantDialogueActions()}
        />
        <Dialogue
          key="addPlantDialogue"
          open={addPlantDialogue}
          close={() => this.handleCloseDialogue("addPlantDialogue")}
          title="Add New Plant"
          contentText="Please provide a name for your new plant."
          content={this.createAddPlantDialogueContent()}
          actions={this.createAddPlantDialogueActions()}
        />
        <br />
        <Grid container justify="center">
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
          <Grid item>
            <Card className={classes.card}>
              <CardContent>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <Typography gutterBottom variant="h5" component="h2">
                      Plants
                    </Typography>
                    <Typography component="p">
                      Your plants
                    </Typography>
                  </div>
                  <IconButton
                    aria-label="Add-Robot"
                    onClick={() => this.handleOpenDialogue("addPlantDialogue")}
                  >
                    <AddIcon />
                  </IconButton>
                </div>
                {plantsList}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </main>
    );
  }
}

const mapStateToProps = props => {
  const { robots, selectedRobot } = props.robotState;
  const { loginToken } = props.auth;
  return {
    reduxRobots: robots,
    selectedRobot,
    loginToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    reduxAddRobot: robot => dispatch(addRobot(robot)),
    reduxRemoveRobot: robot => dispatch(removeRobot(robot)),
    reduxSelectRobot: robot => dispatch(selectRobot(robot)),
    reduxRenameRobot: (robot, name) => dispatch(renameRobot(robot, name))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home));
