import React from "react";
import {connect} from "react-redux";

import {Redirect, Route, Switch} from "react-router-dom";

import Footer from "../../components/Footer/Footer.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";

import dashboardRoutes from "../../routes/dashboard_routes";

const Dashboard = props => {
    const {loggedIn} = props;
    return (
        <div className="wrapper">
            <Sidebar {...props} />
            <div id="main-panel" className="main-panel">
                <Switch>
                    {dashboardRoutes.map((prop, key) => {
                        if (!loggedIn)
                            return <Redirect from={prop.path} to={"/login"} key={key}/>;
                        else if (prop.redirect)
                            return <Redirect from={prop.path} to={prop.to} key={key}/>;
                        return (
                            <Route path={prop.path} component={prop.component} key={key}/>
                        );
                    })}
                </Switch>
                <Footer/>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    const {isLoginSuccess} = state.auth;
    return {
        loggedIn: isLoginSuccess
    };
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
