import React, {useState} from "react";
import {Link} from "react-router-dom";

import dashboardRoutes from "../../routes/dashboard_routes";
import logout from "../../actions/logout";
import store from "../../store";

const Header = props => {
    const {location} = props;
    const [sidebarExists, setSidebarExists] = useState(false);

    const mobileSidebarToggle = event => {
        if (!sidebarExists) {
            setSidebarExists(true);
        }
        event.preventDefault();

        // This is very very bad!!!!!
        document.documentElement.classList.toggle("nav-open");
        let node = document.createElement("div");
        node.id = "bodyClick";
        node.onclick = function () {
            this.parentElement.removeChild(this);
            document.documentElement.classList.toggle("nav-open");
        };
        document.body.appendChild(node);
    };

    const brand = dashboardRoutes
        .filter(route => route.path === location.pathname || route.path === "/")
        .shift();

    const onLogout = event => {
        store.dispatch(logout());
        event.preventDefault();
    };

    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header page-scroll">
                    <button
                        type="button"
                        className="navbar-toggle"
                        onClick={mobileSidebarToggle}
                    >
                        <span className="sr-only">Toggle navigation</span>
                        <i className="fa fa-bars"/>
                    </button>
                    <a className="navbar-brand" href="#todo">
                        {brand.name}
                    </a>
                </div>
                <div
                    className="navbar-collapse collapse"
                    id="bs-example-navbar-collapse-1"
                >
                    <ul className="nav navbar-nav pull-right">
                        <li>
                            <Link to="/settings">Settings</Link>
                        </li>
                        <li>
                            <a href="/logout" onClick={onLogout}>
                                Log out
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;