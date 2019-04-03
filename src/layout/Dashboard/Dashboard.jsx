import React, {useEffect} from "react";
import {connect} from "react-redux";

import {Redirect, Route, Switch} from "react-router-dom";

import Footer from "../../components/Footer/Footer.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import actionAddRobot from "../../actions/add_robot";
import httpFetchRobots from "../../http/fetch_robots";

import dashboardRoutes from "../../routes/dashboard_routes";

const Dashboard = props => {
    const {loggedIn, setRobots, loginToken, robots} = props;

    const fetchRobots = async () => {
        console.log("fetchRobots called")
        const fetchRobotsResult = await httpFetchRobots(loginToken);
        if (!(fetchRobotsResult instanceof Error)) {
            setRobots(fetchRobotsResult.robots);
        }
    };

    useEffect(() => {
        if (loggedIn) {
            fetchRobots()
        }
    }, [loginToken])

    return (
        <div className="wrapper">
            <Sidebar {...props} />
            <div id="main-panel" className="main-panel">
                <Switch>
                    {dashboardRoutes.map((prop, key) => {
                        if (!loggedIn)
                            return <Redirect from={prop.path} to={`/login?next=${encodeURIComponent(prop.path)}`} key={key}/>;
                        else if (prop.redirect)
                            return <Redirect from={prop.path} to={prop.to} key={key}/>;
                        return (
                            <Route path={prop.path} render={props => <prop.component {...props} fetchRobots={fetchRobots} />} key={key}/>
                        );
                    })}
                </Switch>
                <Footer/>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    const { auth: { isLoginSuccess, loginToken }, robotState: { robots } } = state;
    return {
        loggedIn: isLoginSuccess,
        robots,
        loginToken,
    };
};


const mapDispatchToProps = dispatch => {
    return {
        addRobot: robot => dispatch(actionAddRobot(robot)),
        setRobots: robots => dispatch({
            type: "SET_ROBOTS",
            robots
        }),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
