/* global document */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  Route,
  Switch,
  Redirect,
  HashRouter as Router,
} from 'react-router-dom';
import getStore from './store';
import App from './components/Core/App';
import Map from './components/Map';
import Character from './components/Character';

const RouteMap = (
  <Provider store={getStore()}>
    <Router>
      <App>
        <Switch>
          <Route path="/maps/:id?" component={Map} />
          <Route path="/characters/:id?" component={Character} />
          <Redirect to="/maps" />
        </Switch>
      </App>
    </Router>
  </Provider>
);

const mountNode = document.createElement('main');
document.body.appendChild(mountNode);

ReactDOM.render(RouteMap, mountNode);
