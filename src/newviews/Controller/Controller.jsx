import React from "react";
import { connect } from "react-redux";

const Controller = props => {

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