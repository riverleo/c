import _ from 'lodash';
import cn from 'classnames';
import React from 'react';
import {
  func,
  shape,
  number,
  string,
  arrayOf,
} from 'prop-types';
import { connect } from 'react-redux';
import { className } from './index.scss';
import handleChangeSize from './handleChangeSize';
import handleSelectChop from '../Aside/Item/Terrain/handleSelect';

const mapStateToProps = state => ({
  app: state.map.editor.app,
  aside: state.map.editor.aside,
});

const Toolbar = ({
  app,
  aside,
  dispatch,
}) => {
  const {
    size,
    selectedTerrain,
    selectedTerrainChop,
  } = app;
  const { hash } = aside;
  const { chops } = selectedTerrain || {};

  return (
    <nav className={className}>
      <div className="terrain">
        {
          _.map(chops, chop => (
            <button
              key={chop}
              type="button"
              className={cn('chop', { active: chop === selectedTerrainChop })}
              onClick={
                handleSelectChop({
                  chop,
                  dispatch,
                })
              }
            >
              <i style={{ backgroundImage: `url("${chop}?${hash}")` }} />
            </button>
          ))
        }
        <button
          type="button"
          className={cn('erase', { active: selectedTerrainChop === 'erase' })}
          onClick={
            handleSelectChop({
              chop: 'erase',
              dispatch,
            })
          }
        >
          지우개
        </button>
      </div>
      <div className="size">
        <button
          type="button"
          className="decrement"
          onClick={
            handleChangeSize({
              size: size - 5,
              dispatch,
            })
          }
        >
          -
        </button>
        <input
          type="number"
          value={size}
          onChange={handleChangeSize({ dispatch })}
        />
        <button
          type="button"
          className="increment"
          onClick={
            handleChangeSize({
              size: size + 5,
              dispatch,
            })
          }
        >
          +
        </button>
      </div>
    </nav>
  );
};

Toolbar.propTypes = {
  app: shape({
    size: number,
    selectedChop: string,
    selectedTerrain: shape({
      chops: arrayOf(string).isRequired,
    }),
  }).isRequired,
  aside: shape({
    hash: number,
  }).isRequired,
  dispatch: func.isRequired,
};

export default connect(mapStateToProps)(Toolbar);
