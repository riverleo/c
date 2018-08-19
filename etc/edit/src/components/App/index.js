import React from 'react';
import { node } from 'prop-types';
import Navbar from './Navbar';
import './index.scss';

const App = ({ children }) => [
  <Navbar key="navbar" />,
  <div
    id="appContent"
    key="appContent"
  >
    {children}
  </div>,
];

App.propTypes = {
  children: node.isRequired,
};

export default App;
