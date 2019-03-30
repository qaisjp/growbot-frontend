import React, {useState, useEffect} from "react";
import moment from "moment";

import Card from "../../components/Card/Card";
import httpFetchLogs from "../../http/fetch_logs";
import { connect } from "react-redux";

const Logging = props => {

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs()
  }, []);

  const getRobotName = id => {

  };

  const getPlantName = id => {

  };

  const fetchLogs = async () => {
    const { loginToken } = props;
    const fetchLogsResult = await httpFetchLogs(loginToken);

    if(!(fetchLogsResult instanceof Error)) {
      console.log(fetchLogsResult);
      const {entries} = fetchLogsResult;
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
              <tr className="success">
                <td>
                  {log.message}
                  <br />
                  <small>Robot: PrototypeBot · Plant: Sunflower</small>
                </td>
                <td>{moment(log.created_at).fromNow()}</td>
              </tr>
            ))}
              <tr className="danger">
                <td>
                  GrowBot is stuck between two objects
                  <br />
                  <small>
                    <strong>Robot: </strong>PrototypeBot ·{" "}
                    <strong>Plant: </strong>
                    Sunflower
                  </small>
                </td>
                <td>3 hours ago</td>
              </tr>
              <tr className="success">
                <td>
                  GrowBot successfully watered your plant
                  <br />
                  <small>Robot: PrototypeBot · Plant: Sunflower</small>
                </td>
                <td>3 hours ago</td>
              </tr>
            </tbody>
          </table>
        }
      />
    </div>
  );
};

const mapStateToProps = props => {
  const { plants } = props.plantState;
  const { selectedRobot } = props.robotState;
  const { loginToken } = props.auth;
  return {
    loginToken,
    selectedRobot,
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