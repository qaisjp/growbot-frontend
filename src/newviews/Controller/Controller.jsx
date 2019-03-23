import React, {useState} from "react";
import { connect } from "react-redux";

import moveRobot from "../../http/move_robot";
import Gamepad from "../../components/Gamepad/Gamepad";

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
        forward={this.onMove.bind(this, "forward")}
        backward={this.onMove.bind(this, "backward")}
        armdown={this.onMove.bind(this, "armdown")}
        armup={this.onMove.bind(this, "armup")}
        left={this.onMove.bind(this, "left")}
        right={this.onMove.bind(this, "right")}
        brake={this.onMove.bind(this, "brake")}
      />
    );
  };

  return (
    <div className="content">

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