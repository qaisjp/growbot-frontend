import React, {useState, useEffect} from "react";
import {connect} from "react-redux";

import moveRobot from "../../http/move_robot";
import Card from "../../components/Card/Card";
import Dropdown from "../../components/Dropdown/Dropdown";
import Header from "../../components/Header/Header";
import Gamepad from "../../components/Gamepad/Gamepad";
import endpoints from "../../endpoints";
import { api } from "../../API";

const Controller = props => {
    const {robots, loginToken} = props;
    const robotNames = robots.map(robot => robot.title);
    const [selectedRobot, selectRobot] = useState({
        id: 1,
    });
    const [standby, setStandby] = useState(true);

    const onMove = async direction => {
        const {loginToken} = props;
        await moveRobot(loginToken, direction, selectedRobot.id);
    };

    useEffect(() => {
        if (robots.length > 0) {
            selectRobot(robots[0])
            setStandby(robots[0].standby)
        }
    }, [robots])

    useEffect(() => {
      setStandby(selectedRobot.standby)
    }, [selectedRobot])

    const gamepad = (
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

    const gamepadOff = (
        <span>Please turn off Demo Mode to access the gamepad.</span>
    )

    const toggleStandby = () => {
        const s = !standby;
        setStandby(s);
        api.toggleStandby(loginToken, selectedRobot.id, s);
    }

    return <>
        <Header location={props.location}>
            <Dropdown style={{display: "inline"}} items={robotNames}
                name={selectedRobot.title || "Robots"}
                color="primary"
                click={robotName => {
                    const idx = robotNames.indexOf(robotName);
                    selectRobot(robots[idx]);
                }}
            />
            <small style={{marginLeft: "2em", marginRight: "0.5em"}}>Mode:</small>
            <button type="button" onClick={toggleStandby} className={`btn btn-${standby ? "secondary" : "success"}`}>{standby ? "Standby" : "Demo"}</button>
        </Header>
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
                                  <span>Controller</span>
                                </span>
                            }
                            content={standby ? gamepad : gamepadOff}
                        />
                    </div>
                    <div className="col-md-6">
                        <Card
                            title={<span>Live Stream</span>}
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
