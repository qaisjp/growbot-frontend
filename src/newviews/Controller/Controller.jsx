import React, {useState} from "react";
import { connect } from "react-redux";

import moveRobot from "../../http/move_robot";
import Card from "../../components/Card/Card";
import Gamepad from "../../components/Gamepad/Gamepad";
import endpoints from "../../endpoints";

const Controller = props => {

  const { selectedRobot, loginToken } = props;
  const [alertVisible, showAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);


  const onMove = async direction => {
    const { loginToken, selectedRobot } = props;
    const response = await moveRobot(loginToken, direction, selectedRobot.id);

    showAlert(true);
    if (response.status === 200) {
      alertMessage("Successfully moved robot!");
    } else {
      const body = await response.json();
      setAlertMessage(body.message);
    }
  };

  const createGamepad = () => {
    return (
      <Gamepad
        forward={onMove.bind(this, "forward")}
        backward={onMove.bind(this, "backward")}
        armdown={onMove.bind(this, "armdown")}
        armup={onMove.bind(this, "armup")}
        left={onMove.bind(this, "left")}
        right={onMove.bind(this, "right")}
        brake={onMove.bind(this, "brake")}
      />
    );
  };

  return (
    <div className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <Card
              title={<span>Controller - {selectedRobot.title}</span>}
              content={createGamepad()}
            />
          </div>
          <div className="col-md-6">
            <Card
              title={<span>Live Stream - {selectedRobot.title}</span>}
              content={<img
                alt="Video stream"
                src={endpoints.robot_video(selectedRobot.id, loginToken)}
              />}
            />
          </div>
        </div>
      </div>
    </div>
  )

};

const mapStateToProps = props => {
  const { selectedRobot } = props.robotState;
  const { loginToken } = props.auth;
  return {
    selectedRobot,
    loginToken
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Controller);