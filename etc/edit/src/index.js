/* global document */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  Route,
  Switch,
  HashRouter as Router,
} from 'react-router-dom';
import getStore from './store';
import App from './components/core/App';
import Map from './components/Map';
import Home from './components/Home';
import Texture from './components/Texture';
import Building from './components/Building';
import Character from './components/Character';

const RouteMap = (
  <Provider store={getStore()}>
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/maps/:id?" component={Map} />
          <Route path="/textures/:id?" component={Texture} />
          <Route path="/buildings/:id?" component={Building} />
          <Route path="/characters/:id?" component={Character} />
        </Switch>
      </App>
    </Router>
  </Provider>
);

const mountNode = document.createElement('main');
document.body.appendChild(mountNode);

ReactDOM.render(RouteMap, mountNode);
