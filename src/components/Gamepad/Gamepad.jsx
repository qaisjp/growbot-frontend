import React from "react";

import roboticArm from "../../assets/img/robotic-arm.svg";
import tdown from "../../assets/img/TriangleArrow-Down.svg";
import tup from "../../assets/img/TriangleArrow-Up.svg";
import tleft from "../../assets/img/TriangleArrow-Left.svg";
import tright from "../../assets/img/TriangleArrow-Right.svg";
import indication from "../../assets/img/Parking_brake-indication.svg";

import "../../assets/css/gamepad-styles.css";

const Gamepad = props => {
  const { forward, backward, left, right, brake, armup, armdown } = props;
  return (
    <div id="main-wrapper" {...props}>
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
