import React from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Header from "../../components/Header/Header.jsx";

import dashboardRoutes from "../../routes/view_routes";

export default function Dashboard(props) {
    return (
      <div className="wrapper">
        <Sidebar {...props} />
        <div id="main-panel" className="main-panel">
          <Header {...props} />
          <Switch>
            {dashboardRoutes.map((prop, key) => {
              if (prop.redirect)
                return <Redirect from={prop.path} to={prop.to} key={key} />;
              return (
                <Route path={prop.path} component={prop.component} key={key} />
              );
            })}
          </Switch>
        </div>
      </div>
    );
}