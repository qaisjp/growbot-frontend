import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

import indexRoutes from "./routes/index";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/sass/light-bootstrap-dashboard.css?v=1.2.0";
import "./assets/css/pe-icon-7-stroke.css";

const App = () => (
  <HashRouter>
    <Switch>
      {indexRoutes.map((prop, key) => {
        return <Route to={prop.path} component={prop.component} key={key} />;
      })}
    </Switch>
  </HashRouter>
);

export default App;