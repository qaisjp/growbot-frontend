import React, { Component } from "react";

import AddIcon from "@material-ui/icons/Add";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import EditIcon from "@material-ui/icons/Edit";
import RemoveIcon from "@material-ui/icons/Remove";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";

import { connect } from "react-redux";

import banner from "../../assets/views/Home/img/banner.jpg";
import offline from "../../assets/views/Home/img/red_circle.png";
import online from "../../assets/views/Home/img/green_circle.png";
import styles from '../../assets/views/Home/jss/home-styles'

import addRobot from '../../actions/add_robot';
import removeRobot from '../../actions/remove_robot';
import selectRobot from '../../actions/select_robot';
import fetchRobots from "../../http/fetch_robots";

class Home extends Component {

  state = {
    selectedRobotId: 0
  };

  componentDidMount = async () => {
    this.fetchRobots();
  }
  
  isRobotOnline = robot => {
    return robot.seen_at !== null;
  };

  createCardHeader = () => {
    const { classes } = this.props;
    return (
      <CardMedia
        className={classes.media}
        image={banner}
        title={"Controller"}
        width="100%"
      />
    );
  };

  fetchRobots = async() => {
    const { loginToken, reduxAddRobot } = this.props;
    const fetchRobotsResult = await fetchRobots(loginToken);

    if (fetchRobotsResult instanceof Error) {
      //this.setState({ robots: [] });
    } else {
      const { robots } = fetchRobotsResult;
      robots.forEach(robot => {
        reduxAddRobot(robot);
      });
      //this.setState({ robots });
      //if (robots.length > 0) {
        //this.handleListItemClick(null, fetchRobotsResult.robots[0]);
      //}
    }
  };

  createRobotList = () => {
    const { classes, robots } = this.props;
    const { selectedRobotId } = this.state;
    return (
      <List className={classes.root}>
        {robots.map(robot => (
          <ListItem
            key={robot.id}
            alignItems="flex-start"
            button
            selected={selectedRobotId === robot.id}
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
            {selectedRobotId === robot.id && (
              <React.Fragment>
                <IconButton
                >
                  <RemoveIcon />
                </IconButton>
                <IconButton
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

  render() {
    const { classes, robots } = this.props;
    const cardHeader = this.createCardHeader();
    const robotsList = this.createRobotList();
    return (
      <Card className={classes.card}>
        {cardHeader}

        <CardContent>
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <Typography gutterBottom variant="h5" component="h2">
                Robots
              </Typography>
              <Typography component="p">
                {robots.length === 0
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
    );
  }
}

const mapStateToProps = (props) => {
  const { robots } = props.robotState;
  const { loginToken } = props.auth;
  return {
    robots, loginToken
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    reduxAddRobot: robot => dispatch(addRobot(robot)),
    reduxRemoveRobot: robot => dispatch(removeRobot(robot)),
    reduxSelectRobot: robot => dispatch(selectRobot(robot))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));