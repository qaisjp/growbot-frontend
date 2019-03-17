import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import indexRoutes from "./routes/index";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/sass/light-bootstrap-dashboard.css?v=1.2.0";
import "./assets/css/pe-icon-7-stroke.css";

const App = () => (
  <BrowserRouter>
    <Switch>
      {indexRoutes.map((prop, key) => {
        return <Route path={prop.path} component={prop.component} key={key} />;
      })}
    </Switch>
  </BrowserRouter>
);

export default App;