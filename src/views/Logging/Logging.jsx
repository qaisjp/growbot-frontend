import React, { useState, useEffect } from "react";
import moment from "moment";

import Card from "../../components/Card/Card";
import httpFetchLogs from "../../http/fetch_logs";
import { connect } from "react-redux";

const severity = {
  0: "info",
  1: "success",
  2: "warning",
  3: "danger"
};

const Logging = props => {

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const getRobotName = id => {
    const { reduxRobots } = props;
    console.log(reduxRobots);
    console.log(id);
    const robots = reduxRobots.filter(robot => robot.id === id);
    return robots.length > 0 ? robots.pop().title : "Robot not in database!";
  };

  const getPlantName = id => {
    const { reduxPlants } = props;
    const plants = reduxPlants.filter(plant => plant.id === id);
    return plants.length > 0 ? plants.pop().name : "Plant not in database!";
  };

  const fetchLogs = async () => {
    const { loginToken } = props;
    const fetchLogsResult = await httpFetchLogs(loginToken);

    if (!(fetchLogsResult instanceof Error)) {
      const { entries } = fetchLogsResult;
      setLogs(entries);
    }
  };

  return (
    <div className="content">
      <Card
        title={"Robot Logs"}
        content={
          <table className="table">
            <thead>
              <tr>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <tr className={severity[log.severity]}>
                  <td>
                    {log.message}
                    <br />
                    <strong>Robot: </strong>
                    {getRobotName(log.robot_id)} <strong>Plant: </strong>
                    {getPlantName(log.plant_id)}
                  </td>
                  <td>{moment(log.created_at).fromNow()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      />
    </div>
  );
};

const mapStateToProps = props => {
  const { plants } = props.plantState;
  const { robots, selectedRobot } = props.robotState;
  const { loginToken } = props.auth;
  return {
    loginToken,
    selectedRobot,
    reduxRobots: robots,
    reduxPlants: plants
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logging);
