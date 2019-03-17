import React, { useState, useEffect } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import QrReader from "react-qr-reader";

import Card from "../../components/Card/Card.jsx";
import Modal from "../../components/Modal/Modal.jsx";
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
  const { reduxRobots, reduxSelectRobot, selectedRobot, reduxPlants } = props;

  const [selectedPlant, selectPlant] = useState({});
  const [renamePlantName, setRenamePlantName] = useState("");
  const [newPlantName, setNewPlantName] = useState("");
  const [newRobotSerialKey, setNewRobotSerialKey] = useState("");
  const [newRobotTitle, setNewRobotTitle] = useState("");
  const [renameRobotTitle, setRenameRobotTitle] = useState("");
  const [addRobotModalOpen, addRobotModalVisible] = useState(false);
  const [renameRobotModalOpen, renameRobotModalVisible] = useState(false);
  const [removeRobotModalOpen, removeRobotModalVisible] = useState(false);
  const [alertVisible, showAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [qrDelay] = useState(0);

  useEffect(() => {
    fetchRobots();
    fetchPlants();
  }, []);

  const fetchRobots = async () => {
    const { loginToken, reduxAddRobot, selectedRobot } = props;
    const fetchRobotsResult = await httpFetchRobots(loginToken);

    if (!(fetchRobotsResult instanceof Error)) {
      const { robots } = fetchRobotsResult;
      const reduxRobotIds = reduxRobots.map(robot => robot.id);
      robots.forEach(robot => {
        if (reduxRobotIds.indexOf(robot.id) < 0) {
          reduxAddRobot(robot);
        }
      });
    }
  };
  const fetchPlants = async () => {
    const { loginToken, reduxAddPlant } = props;
    const fetchPlantsResult = await httpFetchPlants(loginToken);

    if (!(fetchPlantsResult instanceof Error)) {
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
    const { loginToken, reduxRemoveRobot } = props;

    const response = await httpRemoveRobot(loginToken, selectedRobot.id);

    if (response.status === 200) {
      reduxRemoveRobot(selectedRobot);
    }

    removeRobotModalVisible(false);
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
    }
  };
  const onRemovePlant = async () => {
    const { loginToken, reduxRemovePlant } = props;

    const response = await httpRemovePlant(loginToken, selectedPlant.id);

    if (response.status === 200) {
      reduxRemovePlant(selectedPlant);
    }
  };
  const onAddRobot = async () => {
    if(newRobotSerialKey === "" || newRobotTitle === "") {
      showAlert(true);
      setAlertMessage("Please make sure you've added a serial key and a title!");
      return;
    }
    const { loginToken, reduxAddRobot } = props;
    const response = await httpAddRobot(
      loginToken,
      newRobotSerialKey,
      newRobotTitle
    );

    if (response.status === 200) {
      const fetchRobotsResult = await fetchRobots(loginToken);

      if (!fetchRobotsResult instanceof Error) {
        const { robots } = fetchRobotsResult;
        const reduxRobotIds = reduxRobots.map(robot => robot.id);
        robots.forEach(robot => {
          if (reduxRobotIds.indexOf(robot.id) < 0) {
            reduxAddRobot(robot);
          }
        });
      }
    }
    addRobotModalVisible(false);
    showAlert(false);
    setAlertMessage("");
  };
  const onAddPlant = async () => {
    const { loginToken, reduxAddPlant } = props;
    const response = await httpAddPlant(loginToken, newPlantName);

    if (response.status === 200) {
      const fetchPlantsResult = await fetchPlants(loginToken);

      if (!(fetchPlantsResult instanceof Error)) {
        const { plants } = fetchPlantsResult;
        const reduxPlantIds = reduxPlants.map(plant => plant.id);
        plants.forEach(plant => {
          if (reduxPlantIds.indexOf(plant.id) < 0) {
            reduxAddPlant(plant);
          }
        });
      }
    }
  };
  const onRenameRobot = async () => {
    if(renameRobotTitle === "") {
      showAlert(true);
      setAlertMessage("Please make sure you've entered a new name!");
      return;
    }
    const { loginToken, reduxRenameRobot } = props;

    const response = await httpRenameRobot(
      loginToken,
      selectedRobot.id,
      renameRobotTitle
    );

    if (response.status === 200) {
      reduxRenameRobot(selectedRobot, renameRobotTitle);
    }
    renameRobotModalVisible(false);
    showAlert(false);
    setAlertMessage("");
  };
  const createRenameRobotModalContent = () => {
    return (
      <div>
        <div style={!alertVisible ? {display: "none"} : {display: "block"}} className="alert alert-danger" role="alert">{alertMessage}</div>
        <p>Please give the robot a new name</p>
        <div className="form-group">
          <label htmlFor="inputName">New Name</label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            placeholder="Name"
            onChange={event => setRenameRobotTitle(event.target.value)}
          />
        </div>
      </div>
    );
  };
  const createRenameRobotModalFooter = () => {
    return (
      <React.Fragment>
        <React.Fragment>
          <button
            onClick={() => {
              showAlert(false);
              setAlertMessage("");
              renameRobotModalVisible(false);
            }}
            className="btn btn-danger"
          >
            Close
          </button>
          <button onClick={onRenameRobot} className="btn btn-danger">
            Rename
          </button>
        </React.Fragment>
      </React.Fragment>
    );
  };
  const createRemoveRobotModalContent = () => {
    return <p>Are you sure you want to remove this robot?</p>;
  };
  const createRemoveRobotModalFooter = () => {
    return (
      <React.Fragment>
        <React.Fragment>
          <button
            onClick={() => {
              removeRobotModalVisible(false)
            }}
            className="btn btn-danger"
          >
            Close
          </button>
          <button onClick={onRemoveRobot} className="btn btn-danger">
            Remove
          </button>
        </React.Fragment>
      </React.Fragment>
    );
  };
  const createAddRobotModalContent = () => {
    return (
      <React.Fragment>
        <div style={!alertVisible ? {display: "none"} : {display: "block"}} className="alert alert-danger" role="alert">{alertMessage}</div>
        <QrReader
          delay={qrDelay}
          onError={qrHandleError}
          onScan={qrHandleScan}
          style={{ width: "100%" }}
        />
        <div>
          <div className="form-group">
            <label htmlFor="inputSerialKey">Serial Key</label>
            <input
              type="text"
              className="form-control"
              id="inputSerialKey"
              placeholder="Key"
              onChange={event => setNewRobotSerialKey(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputTitle">Title</label>
            <input
              type="text"
              className="form-control"
              id="inputTitle"
              placeholder="Title"
              onChange={event => setNewRobotTitle(event.target.value)}
            />
          </div>
        </div>
      </React.Fragment>
    );
  };
  const createAddRobotModalFooter = () => {
    return (
      <React.Fragment>
        <button
          onClick={() =>{     showAlert(false);
            setAlertMessage("");
            addRobotModalVisible(false)}}
          className="btn btn-danger"
        >
          Close
        </button>
        <button onClick={onAddRobot} className="btn btn-danger">
          Add
        </button>
      </React.Fragment>
    );
  };
  const qrHandleScan = data => {
    const prefix = "growbot:";
    if (data && data.startsWith(prefix))
      setNewRobotSerialKey(data.slice(prefix.length));
  };
  const qrHandleError = error => {
    alert(error);
  };

  return (
    <div className="content">
      <Modal
        open={addRobotModalOpen}
        close={() => addRobotModalVisible(false)}
        title="Add Robot"
        content={createAddRobotModalContent()}
        footer={createAddRobotModalFooter()}
      />
      <Modal
        open={removeRobotModalOpen}
        close={() => removeRobotModalVisible(false)}
        title="Remove Robot"
        content={createRemoveRobotModalContent()}
        footer={createRemoveRobotModalFooter()}
      />
      <Modal
        open={renameRobotModalOpen}
        close={() => renameRobotModalVisible(false)}
        title="Rename Robot"
        content={createRenameRobotModalContent()}
        footer={createRenameRobotModalFooter()}
      />

      <Grid fluid>
        <Row>
          <Col md={6}>
            <Card
              title={"Your Robots"}
              content={
                <div>
                  <SelectableList
                    onSelect={idx => reduxSelectRobot(reduxRobots[idx])}
                    items={reduxRobots
                      .filter(robot => robot !== undefined)
                      .map(robot => (
                        <div>
                          <h4 className="list-group-item-heading">
                            <img
                              src={
                                robot.seen_at !== null
                                  ? green_circle
                                  : red_circle
                              }
                              alt="Status"
                            />{" "}
                            {robot.title}
                          </h4>
                          <span
                            style={{ marginRight: "15px" }}
                            className="label label-primary"
                          >{`Water: ${robot.water_level}ml`}</span>
                          <span className="label label-default">{`Battery: ${
                            robot.battery_level
                          }%`}</span>
                        </div>
                      ))}
                  />
                  <button
                    style={{ marginRight: "10px" }}
                    onClick={() => addRobotModalVisible(true)}
                    className="btn btn-danger"
                  >
                    Add Robot
                  </button>
                  <button
                    style={{ marginRight: "10px" }}
                    onClick={() => removeRobotModalVisible(true)}
                    className="btn btn-danger"
                  >
                    Remove Robot
                  </button>
                  <button
                    onClick={() => renameRobotModalVisible(true)}
                    className="btn btn-danger"
                  >
                    Rename Robot
                  </button>
                </div>
              }
            />
          </Col>
          <Col md={6}>
            <Card
              title={"Your Plants"}
              content={
                <ul className="list-group">
                  {reduxPlants.map((plant, idx) => (
                    <li key={idx} className="list-group-item">
                      {plant.name} <button type="button" style={{marginLeft: "10px"}} className="btn btn-sm btn-danger pull-right"><i className="glyphicon glyphicon-minus"/></button> <button type="button" className="btn btn-sm btn-danger pull-right"><i className="glyphicon glyphicon-pencil"/></button>
                    </li>
                  ))}
                </ul>
              }
            />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
