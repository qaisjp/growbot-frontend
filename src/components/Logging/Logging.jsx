import React from "react";
import moment from "moment";

const severity = {
  0: "info",
  1: "success",
  2: "warning",
  3: "danger"
};

const Logging = props => {
  const { logs, reduxRobots, getRobotName, reduxPlants, getPlantName } = props;

  return (
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
              {getRobotName(log.robot_id, reduxRobots)} <strong>Plant: </strong>
              {getPlantName(log.plant_id, reduxPlants)}
            </td>
            <td>{moment(log.created_at).fromNow()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Logging;