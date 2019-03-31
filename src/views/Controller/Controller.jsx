import React from "react";
import {connect} from "react-redux";

import moveRobot from "../../http/move_robot";
import Card from "../../components/Card/Card";
import Gamepad from "../../components/Gamepad/Gamepad";
import endpoints from "../../endpoints";

const Controller = props => {
    const {selectedRobot, loginToken} = props;

    const onMove = async direction => {
        const {loginToken, selectedRobot} = props;
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
    );
};

const mapStateToProps = props => {
    const {selectedRobot} = props.robotState;
    const {loginToken} = props.auth;
    return {
        selectedRobot,
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
