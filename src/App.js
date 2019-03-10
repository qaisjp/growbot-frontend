import React, { Component } from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import Layout from "./layout/Layout";

const hist = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={hist}>
        <Layout />
      </Router>
    );
  }
}

export default App;
