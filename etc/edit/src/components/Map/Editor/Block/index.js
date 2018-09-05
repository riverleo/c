import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  any,
  func,
  array,
  shape,
  number,
  arrayOf,
  objectOf,
} from 'prop-types';
import { className } from './index.scss';
import handleAdd from './handleAdd';

const mapStateToProps = state => ({
  app: state.map.editor.app,
  aside: state.map.editor.aside,
});

class Block extends Component {
  static propTypes = {
    x: number.isRequired,
    y: number.isRequired,
    app: shape({
      map: shape({
        layout: arrayOf(array),
      }),
    }).isRequired,
    aside: shape({
      selected: objectOf(any),
    }).isRequired,
    dispatch: func.isRequired,
  };

  handle = () => {
  }

  render() {
    const {
      x,
      y,
      app,
      aside,
      dispatch,
    } = this.props;
    const { map } = app;
    const { layout } = map || {};
    const { selected } = aside;
    const data = _.get(layout, [x, y]);

    return (
      <div
        role="presentation"
        style={{
          top: x * 60,
          left: y * 60,
          backgroundImage: data ? `url('${data.path}')` : undefined,
        }}
        onClick={
          handleAdd({
            x,
            y,
            map,
            selected,
            dispatch,
          })
        }
        className={className}
      />
    );
  }
}
export default connect(mapStateToProps)(Block);
