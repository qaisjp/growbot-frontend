import React, { Component } from 'react';
import {RouteComponentProps} from 'react-router'
import {Router, Route} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Layout from './layout/Layout'

let hist = createBrowserHistory()

class App extends Component {

  render() {
      const renderLayout = (props) => {
          return <Layout/>
      }
      return (
          <Router history={hist}>
              <Route path='/' render={renderLayout}/>
          </Router>
      );
  }
}

export default App;
