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
        {logs.map(entry => {
          const robotName = getRobotName(entry.robot_id, reduxRobots);
          const plantName = getPlantName(entry.plant_id, reduxPlants);
          const robot = robotName ? <span><strong>Robot: </strong>{robotName}</span> : null;
          const plant = plantName ? <span><strong>Plant: </strong>{plantName}</span> : null;

          return (
            <tr className={severity[entry.severity]}>
              <td>
                {entry.message} <br /> {robot} {(robotName && plantName ? "•" : null)} {plant}
              </td>
              <td>{moment(entry.created_at).fromNow()}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );
};

export default Logging;