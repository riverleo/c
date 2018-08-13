/* global document */

import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  Switch,
  HashRouter as Router,
} from 'react-router-dom';
import App from './components/App';
import Map from './components/Map';
import Home from './components/Home';
import Texture from './components/Texture';
import Building from './components/Building';
import Character from './components/Character';

const RouteMap = (
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
);

const mountNode = document.createElement('div');
document.body.appendChild(mountNode);

ReactDOM.render(RouteMap, mountNode);
