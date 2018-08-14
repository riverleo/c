import React, { Component } from 'react';
import {
  string,
} from 'prop-types';

class Editor extends Component {
  static propTypes = {
    baseURL: string.isRequired,
  }

  handle = () => {
  }

  render() {
    return (
      <div>editor</div>
    );
  }
}

export default Editor;
