import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import Websocket from "react-websocket";

import Card from "../../components/Card/Card";
import LoggingTable from "../../components/Logging/Logging";
import getPlantName from "../../components/Logging/logging_get_plant_name";
import getRobotName from "../../components/Logging/logging_get_robot_name";
import httpFetchLogs from "../../http/fetch_logs";

const Logging = props => {
    const {reduxPlants, reduxRobots, loginToken} = props;
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        const fetchLogsResult = await httpFetchLogs(loginToken);

        if (!(fetchLogsResult instanceof Error)) {
            const {entries} = fetchLogsResult;
            setLogs(entries);
        }
    };

    const onWebsocketMessage = data => {
        const result = JSON.parse(data);
        if (result.type === "NEW_LOG_ENTRY") {
            logs.push(result.data);
            setLogs(logs);
        }
    };

    return (
        <div className="content">
            <Websocket
                url={"ws://localhost:8888/stream?token=$" + loginToken}
                onMessage={onWebsocketMessage}
            />
            <Card
                title={"Robot Logs"}
                content={
                    <LoggingTable
                        logs={logs}
                        reduxPlants={reduxPlants}
                        getPlantName={getPlantName}
                        reduxRobots={reduxRobots}
                        getRobotName={getRobotName}
                    />
                }
            />
        </div>
    );
};

const mapStateToProps = props => {
    const {plants} = props.plantState;
    const {robots, selectedRobot} = props.robotState;
    const {loginToken} = props.auth;
    return {
        loginToken,
        selectedRobot,
        reduxRobots: robots,
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
