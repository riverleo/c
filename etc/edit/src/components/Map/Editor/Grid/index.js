import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import {
  shape,
  number,
} from 'prop-types';
import { className } from './index.scss';
import Block from './Block';

const mapStateToProps = state => ({
  app: state.map.editor.app,
});

const Grid = ({ app }) => {
  const {
    map,
    size,
  } = app;
  const {
    width,
    height,
  } = map || {};

  return (
    <div
      style={{
        width: (width * size) || 0,
        height: (height * size) || 0,
      }}
      className={className}
    >
      {
        _.times(width, x => (
          _.times(height, y => (
            <Block
              x={x}
              y={y}
              key={`${x}${y}`}
            />
          ))
        ))
      }
    </div>
  );
};

Grid.propTypes = {
  app: shape({
    map: shape({
      width: number.isRequired,
      height: number.isRequired,
    }),
  }).isRequired,
};

export default connect(mapStateToProps)(Grid);
