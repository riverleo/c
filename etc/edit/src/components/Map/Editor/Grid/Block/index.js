import _ from 'lodash';
import cn from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import {
  func,
  array,
  shape,
  number,
  arrayOf,
} from 'prop-types';
import { className } from './index.scss';
import handleAdd from './handleAdd';

const mapStateToProps = state => ({
  app: state.map.editor.app,
});

const Block = ({
  x,
  y,
  app,
  dispatch,
}) => {
  const {
    map,
    size,
    hash,
    selectedTerrainChop,
  } = app;
  const {
    chop,
    layout,
  } = map || {};
  const chops = _.get(layout, [y, x]) || [];

  if (!_.isNil(chop)) {
    chops.push(chop);
  }

  return (
    <div
      role="presentation"
      style={{
        top: y * size,
        left: x * size,
        width: size,
        height: size,
        backgroundImage: _.join(_.map(chops, c => `url('${c}?${hash}')`)),
      }}
      onClick={
        handleAdd({
          x,
          y,
          map,
          chop: selectedTerrainChop,
          dispatch,
        })
      }
      className={cn(className, 'block')}
    />
  );
};

Block.propTypes = {
  x: number.isRequired,
  y: number.isRequired,
  app: shape({
    map: shape({
      layout: arrayOf(array),
    }),
    size: number.isRequired,
  }).isRequired,
  dispatch: func.isRequired,
};

export default connect(mapStateToProps)(Block);
