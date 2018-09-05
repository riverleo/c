import _ from 'lodash';
import axios from 'axios';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  bool,
  func,
  shape,
  number,
  string,
} from 'prop-types';
import { className } from './index.scss';
import { set } from './redux';
import Tool from './Tool';
import Aside from './Aside';
import Block from './Block';
import handleShow from './Aside/handleShow';

const mapStateToProps = state => ({
  app: state.map.editor.app,
  aside: state.map.editor.aside,
});

class Editor extends Component {
  static propTypes = {
    id: string.isRequired,
    app: shape({
      map: shape({
        width: number.isRequired,
        height: number.isRequired,
      }),
    }).isRequired,
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
      app,
      aside,
      dispatch,
    } = this.props;
    const {
      map,
      size,
    } = app;
    const { show } = aside;
    const {
      width,
      height,
    } = map || {};

    if (_.isNil(map)) { return null; }

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
          <div
            id="layout"
            style={{
              width: width * size,
              height: height * size,
            }}
          >
            {
              _.times(width, x => (
                _.times(height, y => (
                  <Block
                    key={`${x}${y}`}
                    x={x}
                    y={y}
                  />
                ))
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Editor);
