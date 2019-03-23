import React from "react";

import roboticArm from "../../assets/components/Gamepad/img/robotic-arm.svg";
import tdown from "../../assets/components/Gamepad/img/TriangleArrow-Down.svg";
import tup from "../../assets/components/Gamepad/img/TriangleArrow-Up.svg";
import tleft from "../../assets/components/Gamepad/img/TriangleArrow-Left.svg";
import tright from "../../assets/components/Gamepad/img/TriangleArrow-Right.svg";
import indication from "../../assets/components/Gamepad/img/Parking_brake-indication.svg";

import "../../assets/components/Gamepad/css/style.css";

const Gamepad = props => {
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
          <button
            className="btn btn-sm btn-danger"
            onClick={armup}
            style={{ opacity: 0.8 }}
          >
            <img
              src={tup}
              className="arrow-image arrow-vert"
              alt="Move arm up"
            />
          </button>
        </div>
        <div className="grid-item">
          <img src={roboticArm} id="robotic-arm-icon" alt="" />
        </div>
        <div className="grid-item">
          <button
            className="btn btn-sm btn-danger"
            onClick={armdown}
            style={{ opacity: 0.8 }}
          >
            <img
              src={tdown}
              className="arrow-image arrow-vert"
              alt="Move arm down"
            />
          </button>
        </div>
      </div>
      <div id="directional-wrapper">
        <div className="grid-item" />
        <div className="grid-item">
          <button
            className="btn btn-sm btn-danger"
            onClick={forward}
            style={{ opacity: 0.8 }}
          >
            <img
              src={tup}
              className="arrow-image arrow-vert"
              alt="Move bot forward"
            />
          </button>
        </div>
        <div className="grid-item" />
        <div className="grid-item">
          <button
            className="btn btn-sm btn-danger"
            onClick={left}
            style={{ opacity: 0.8 }}
          >
            <img
              src={tleft}
              className="arrow-image arrow-hor"
              alt="Move bot left"
            />
          </button>
        </div>
        <div className="grid-item">
          <button
            className="btn btn-sm btn-danger"
            onClick={brake}
            style={{ opacity: 0.8 }}
          >
            <img src={indication} className="circle-centre" alt="Brake bot" />
          </button>
        </div>
        <div className="grid-item">
          <button
            className="btn btn-sm btn-danger"
            onClick={right}
            style={{ opacity: 0.8 }}
          >
            <img
              src={tright}
              className="arrow-image arrow-hor"
              alt="Move bot right"
            />
          </button>
        </div>
        <div className="grid-item" />
        <div className="grid-item">
          <button
            className="btn btn-sm btn-danger"
            onClick={backward}
            style={{ opacity: 0.8 }}
          >
            <img
              src={tdown}
              className="arrow-image arrow-vert"
              alt="Move bot backward"
            />
          </button>
        </div>
        <div className="grid-item" />
      </div>
    </div>
  );
};

export default Gamepad;
