import axios from 'axios';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  bool,
  func,
  shape,
  string,
} from 'prop-types';
import { className } from './index.scss';
import { set } from './redux';
import Tool from './Tool';
import Grid from './Grid';
import Aside from './Aside';
import handleShow from './Aside/handleShow';

const mapStateToProps = state => ({
  aside: state.map.editor.aside,
});

class Editor extends Component {
  static propTypes = {
    id: string.isRequired,
    aside: shape({
      show: bool,
    }).isRequired,
    dispatch: func.isRequired,
  }

  componentDidMount() {
    const {
      id,
      dispatch,
    } = this.props;

    axios.get(`/maps/${id}`)
      .then(({ data: map }) => dispatch(set({ map })));
  }

  render() {
    const {
      aside,
      dispatch,
    } = this.props;
    const { show } = aside;

    return (
      <div
        role="presentation"
        onClick={
          handleShow({
            show: false,
            current: show,
            dispatch,
          })
        }
        className={className}
      >
        <Tool />
        <Aside />
        <div id="frame">
          <Grid />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Editor);
