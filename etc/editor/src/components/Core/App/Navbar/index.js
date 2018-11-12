import React from 'react';
import { Link } from 'react-router-dom';
import { className } from './index.scss';

const Navbar = () => (
  <nav className={className}>
    <ul>
      <li>
        <Link to="/maps">
          맵
        </Link>
      </li>
      <li>
        <Link to="/characters">
          캐릭터
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
