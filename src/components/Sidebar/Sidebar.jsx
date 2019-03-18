import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import sidebarActions from "./sidebar_actions";
import dashboardRoutes from "../../routes/dashboard_routes";

const Sidebar = props => {
  console.log(sidebarActions);
  const { location } = props;
  const [, updateDimensions] = useState(window.innerWidth);
  const activeRoute = routeName =>
    location.pathname.indexOf(routeName) > -1 ? "active" : "";

  useEffect(() => {
    updateDimensions(window.innerWidth);
  });

  return (
    <div id="sidebar" className="sidebar" data-color="red">
      <div className="logo">
        <div className="simple-text logo-normal">GrowBot</div>
      </div>
      <div className="sidebar-wrapper">
        <ul className="nav">
          {dashboardRoutes.map((prop, key) => {
            if (!prop.redirect)
              return (
                <li
                  className={
                    prop.upgrade ? "active active-pro" : activeRoute(prop.path)
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            return null;
          })}
          {sidebarActions.map((prop, key) => {
            return (
              <li key={key}>
                <a
                  href="#logout"
                  className="nav-link active"
                  onClick={prop.action}
                >
                  <i className={prop.icon} />
                  <p>{prop.name}</p>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
