import React, { Component } from 'react';
import { className } from './index.scss';
import Aside from './Aside';

class Editor extends Component {
  handle = () => {
  }

  render() {
    return (
      <div className={className}>
        <Aside />
      </div>
    );
  }
}

export default Editor;
