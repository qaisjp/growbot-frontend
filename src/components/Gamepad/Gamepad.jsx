import React from "react";

import Fab from "@material-ui/core/Fab";
import { withStyles } from "@material-ui/core";

import PropTypes from "prop-types";

import styles from "../../assets/components/Gamepad/css/style.css";
import roboticArm from "../../assets/components/Gamepad/img/robotic-arm.svg";
import tdown from "../../assets/components/Gamepad/img/TriangleArrow-Down.svg";
import tup from "../../assets/components/Gamepad/img/TriangleArrow-Up.svg";
import tleft from "../../assets/components/Gamepad/img/TriangleArrow-Left.svg";
import tright from "../../assets/components/Gamepad/img/TriangleArrow-Right.svg";
import indication from "../../assets/components/Gamepad/img/Parking_brake-indication.svg";

function Gamepad(props) {
  const {
    classes,
    forward,
    backward,
    left,
    right,
    brake,
    armup,
    armdown
  } = props;
  return (
    <div id="main-wrapper">
      <div id="arm-control-wrapper">
        <div className="grid-item">
          <Fab
            size="large"
            color="secondary"
            aria-label="Add"
            className={classes.margin}
            onClick={armup}
          >
            <img
              src={tup}
              className="arrow-image arrow-vert"
              alt="Move arm up"
            />
          </Fab>
        </div>
        <div className="grid-item">
          <img src={roboticArm} id="robotic-arm-icon" alt="" />
        </div>
        <div className="grid-item">
          <Fab
            size="large"
            color="secondary"
            aria-label="Add"
            className={classes.margin}
            onClick={armdown}
          >
            <img
              src={tdown}
              className="arrow-image arrow-vert"
              alt="Move arm down"
            />
          </Fab>
        </div>
      </div>
      <div id="directional-wrapper">
        <div className="grid-item" />
        <div className="grid-item">
          <Fab
            size="large"
            color="secondary"
            aria-label="Add"
            className={classes.margin}
            onClick={forward}
          >
            <img
              src={tup}
              className="arrow-image arrow-vert"
              alt="Move bot forward"
            />
          </Fab>
        </div>
        <div className="grid-item" />
        <div className="grid-item">
          <Fab
            size="large"
            color="secondary"
            aria-label="Add"
            className={classes.margin}
            onClick={left}
          >
            <img
              src={tleft}
              className="arrow-image arrow-hor"
              alt="Move bot left"
            />
          </Fab>
        </div>
        <div className="grid-item">
          <Fab
            size="large"
            color="secondary"
            aria-label="Add"
            className={classes.margin}
            onClick={brake}
          >
            <img src={indication} className="circle-centre" alt="Brake bot" />
          </Fab>
        </div>
        <div className="grid-item">
          <Fab
            size="large"
            color="secondary"
            aria-label="Add"
            className={classes.margin}
            onClick={right}
          >
            <img
              src={tright}
              className="arrow-image arrow-hor"
              alt="Move bot right"
            />
          </Fab>
        </div>
        <div className="grid-item" />
        <div className="grid-item">
          <Fab
            size="large"
            color="secondary"
            aria-label="Add"
            className={classes.margin}
            onClick={backward}
          >
            <img
              src={tdown}
              className="arrow-image arrow-vert"
              alt="Move bot backward"
            />
          </Fab>
        </div>
        <div className="grid-item" />
      </div>
    </div>
  );
}

Gamepad.propTypes = {
  forward: PropTypes.func.isRequired,
  backward: PropTypes.func.isRequired,
  left: PropTypes.func.isRequired,
  right: PropTypes.func.isRequired,
  brake: PropTypes.func.isRequired,
  armup: PropTypes.func.isRequired,
  armdown: PropTypes.func.isRequired
};

export default withStyles({})(Gamepad);
