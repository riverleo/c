import React from 'react';
import { node } from 'prop-types';
import { Link } from 'react-router-dom';
import { className } from './index.scss';

const App = ({ children }) => (
  <div className={className}>
    <nav>
      <Link to="/">
        홈
      </Link>
      <Link to="/maps">
        지역
      </Link>
      <Link to="/textures">
        지형
      </Link>
      <Link to="/buildings">
        건물
      </Link>
      <Link to="/characters">
        캐릭터
      </Link>
    </nav>
    <div>
      {children}
    </div>
  </div>
);

App.propTypes = {
  children: node.isRequired,
};

export default App;
