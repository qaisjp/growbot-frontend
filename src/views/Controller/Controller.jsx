import React, {useState} from "react";
import {connect} from "react-redux";

import moveRobot from "../../http/move_robot";
import Card from "../../components/Card/Card";
import Dropdown from "../../components/Dropdown/Dropdown";
import Header from "../../components/Header/Header";
import Gamepad from "../../components/Gamepad/Gamepad";
import endpoints from "../../endpoints";

const Controller = props => {
    const {robots, loginToken} = props;
    const robotNames = robots.map(robot => robot.title);
    const [selectedRobot, selectRobot] = useState({
        id: 1,
        title: "Please select a robot!"
    });

    const onMove = async direction => {
        const {loginToken} = props;
        await moveRobot(loginToken, direction, selectedRobot.id);
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

    return <>
        <Header location={props.location} />
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <Card
                            title={
                                <span
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}
                                >
                                  <span>Controller - {selectedRobot.title}</span>
                                    <Dropdown style={{display: "inline"}} name="Robots" items={robotNames}
                                              click={robotName => {
                                                  const idx = robotNames.indexOf(robotName);
                                                  selectRobot(robots[idx]);
                                              }}/>
                                </span>
                            }
                            content={createGamepad()}
                        />
                    </div>
                    <div className="col-md-6">
                        <Card
                            title={<span>Live Stream - {selectedRobot.title}</span>}
                            content={
                                <img
                                    alt="Video stream"
                                    src={endpoints.robot_video(selectedRobot.id, loginToken)}
                                />
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    </>;
};

const mapStateToProps = props => {
    const {robots} = props.robotState;
    const {loginToken} = props.auth;
    return {
        robots,
        loginToken
    };
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Controller);
