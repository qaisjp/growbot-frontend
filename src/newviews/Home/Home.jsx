import React, {useState, useEffect} from "react";
import {Grid, Row, Col } from "react-bootstrap";
import {connect} from "react-redux";

import Card from "../../components/Card/Card.jsx";
import SelectableList from "../../components/List/SelectableList.jsx";

import green_circle from "../../assets/img/green_circle.png";
import red_circle from "../../assets/img/red_circle.png";

import removeRobot from "../../actions/remove_robot";
import selectRobot from "../../actions/select_robot";
import addPlant from "../../actions/add_plant";
import addRobot from "../../actions/add_robot";
import renameRobot from "../../actions/rename_robot";
import renamePlant from "../../actions/rename_plant";
import removePlant from "../../actions/remove_plant";
import httpFetchRobots from "../../http/fetch_robots";
import httpFetchPlants from "../../http/fetch_plants";
import httpAddPlant from "../../http/add_plant";
import httpRenamePlant from "../../http/rename_plant";
import httpRemovePlant from "../../http/remove_plant";
import httpAddRobot from "../../http/add_robot";
import httpRenameRobot from "../../http/rename_robot";
import httpRemoveRobot from "../../http/remove_robot";

const Home = props => {

  const {reduxRobots,reduxPlants} = props;

  const [selectedPlant, selectPlant] = useState({});
  const [renamePlantName, setRenamePlantName] = useState("");
  const [newPlantName, setNewPlantName] = useState("");
  const [newRobotSerialKey, setNewRobotSerialKey] = useState("");
  const [newRobotTitle, setNewRobotTitle] = useState("");
  const [renameRobotTitle, setRenameRobotTitle] = useState("");

  useEffect(() => {
    fetchRobots();
    fetchPlants();
  },[]);

  const fetchRobots = async () => {
    const {
      loginToken,
      reduxAddRobot,
      reduxSelectRobot,
      selectedRobot
    } = props;
    const fetchRobotsResult = await httpFetchRobots(loginToken);

    if (fetchRobotsResult instanceof Error) {
      //this.setState({ message: fetchRobotsResult, open: true, type: "error" });
    } else {
      const { robots } = fetchRobotsResult;
      const reduxRobotIds = reduxRobots.map(robot => robot.id);
      robots.forEach(robot => {
        if (reduxRobotIds.indexOf(robot.id) < 0) {
          console.log(robot);
          reduxAddRobot(robot);
        }
      });
      if (selectedRobot.id === -1 && robots.length > 0) {
        reduxSelectRobot(robots[0]);
      }
    }
  };
  const fetchPlants = async () => {
    const { loginToken, reduxAddPlant } = props;
    const fetchPlantsResult = await httpFetchPlants(loginToken);

    if (fetchPlantsResult instanceof Error) {
      //this.setState({ message: fetchPlantsResult, open: true, type: "error" });
    } else {
      const { plants } = fetchPlantsResult;
      const reduxPlantIds = reduxPlants.map(plant => plant.id);
      plants.forEach(plant => {
        if (reduxPlantIds.indexOf(plant.id) < 0) {
          reduxAddPlant(plant);
        }
      });
    }
  };
  const onRemoveRobot = async () => {
    const { loginToken, selectedRobot, reduxRemoveRobot } = props;

    const response = await httpRemoveRobot(loginToken, selectedRobot.id);

    if (response.status === 200) {
      reduxRemoveRobot(selectedRobot);
      /*this.setState({
        message: "Successfully removed robot",
        open: true,
        type: "success"
      });*/
    } else {
      const body = await response.json();
      //this.setState({ message: body.message, open: true, type: "error" });
    }
    //this.handleCloseDialogue("removeRobotDialogue");
  };
  const onRenamePlant = async () => {
    const { loginToken, reduxRenamePlant } = props;

    const response = await httpRenamePlant(
      loginToken,
      selectedPlant.id,
      renamePlantName
    );

    if (response.status === 200) {
      reduxRenamePlant(selectedPlant, renamePlantName);
    } else {
      /*
      this.setState({
        message: (await response.json()).message,
        open: true,
        type: "error"
      });*/
    }
  };
  const onRemovePlant = async () => {
    const { loginToken, reduxRemovePlant } = props;

    const response = await httpRemovePlant(loginToken, selectedPlant.id);

    if (response.status === 200) {
      reduxRemovePlant(selectedPlant);
    } else {
      /*
      this.setState({
        message: (await response.json()).message,
        open: true,
        type: "error"
      });*/
    }
  };
  const onAddRobot = async () => {
    const { loginToken, reduxAddRobot } = props;
    const response = await httpAddRobot(
      loginToken,
      newRobotSerialKey,
      newRobotTitle
    );

    if (response.status === 200) {
      const fetchRobotsResult = await fetchRobots(loginToken);

      if (fetchRobotsResult instanceof Error) {
        /*
        this.setState({
          message: fetchRobotsResult,
          open: true,
          type: "error"
        });*/
      } else {
        const { robots } = fetchRobotsResult;
        const reduxRobotIds = reduxRobots.map(robot => robot.id);
        robots.forEach(robot => {
          if (reduxRobotIds.indexOf(robot.id) < 0) {
            reduxAddRobot(robot);
          }
        });
      }
    } else {
      const body = await response.json();
      //this.setState({ message: body.message, open: true, type: "error" });
    }
  };
  const onAddPlant = async () => {
    const { loginToken, reduxAddPlant } = props;
    const response = await httpAddPlant(loginToken, newPlantName);

    if (response.status === 200) {
      const fetchPlantsResult = await fetchPlants(loginToken);

      if (fetchPlantsResult instanceof Error) {
        /*
        this.setState({
          message: fetchPlantsResult,
          open: true,
          type: "error"
        });*/
      } else {
        const { plants } = fetchPlantsResult;
        const reduxPlantIds = reduxPlants.map(plant => plant.id);
        plants.forEach(plant => {
          if (reduxPlantIds.indexOf(plant.id) < 0) {
            reduxAddPlant(plant);
          }
        });
      }
    } else {
      //this.setState({ message: response, open: true, type: "error" });
    }
  };
  const onRenameRobot = async () => {
    const { loginToken, selectedRobot, reduxRenameRobot } = props;

    const response = await httpRenameRobot(
      loginToken,
      selectedRobot.id,
      renameRobotTitle
    );

    if (response.status === 200) {
      reduxRenameRobot(selectedRobot, renameRobotTitle);
      /*this.setState({
        message: "Successfully renamed robot",
        open: true,
        type: "success"
      });*/
    } else {
      const body = await response.json();
      /*this.setState({
        message: body.message,
        open: true,
        type: "error"
      });*/
    }
    //this.handleCloseDialogue("renameRobotDialogue");
  };
  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={6}>
            <Card
              title={"Your Robots"}
              content={
                <SelectableList items={reduxRobots.map(robot => (
                  <div>
                    <h4 className="list-group-item-heading"><img src={robot.seen_at !== null ? green_circle: red_circle} alt="Status"/> {robot.title}</h4>
                    <span style={{ marginRight: '15px' }} className="label label-primary">{`Water: ${robot.water_level}ml`}</span>
                    <span className="label label-default">{`Battery: ${robot.battery_level}%`}</span>
                  </div>
                ))}/>
              }/>
          </Col>
          <Col md={6}>
            <Card
              title={"Your Plants"}
              content={
                <ul className="list-group">
                  {
                    reduxPlants.map(plant => <li className="list-group-item">{plant.name}</li>)
                  }
                </ul>
              }/>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

const mapStateToProps = props => {
  const { robots, selectedRobot } = props.robotState;
  const { plants } = props.plantState;
  const { loginToken } = props.auth;
  return {
    reduxRobots: robots,
    selectedRobot,
    loginToken,
    reduxPlants: plants
  };
};

const mapDispatchToProps = dispatch => {
  return {
    reduxAddRobot: robot => dispatch(addRobot(robot)),
    reduxRemoveRobot: robot => dispatch(removeRobot(robot)),
    reduxSelectRobot: robot => dispatch(selectRobot(robot)),
    reduxRenameRobot: (robot, name) => dispatch(renameRobot(robot, name)),
    reduxAddPlant: plant => dispatch(addPlant(plant)),
    reduxRemovePlant: plant => dispatch(removePlant(plant)),
    reduxRenamePlant: (plant, name) => dispatch(renamePlant(plant, name))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);