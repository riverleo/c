import React from 'react';
import {
  func,
  shape,
  number,
} from 'prop-types';
import { connect } from 'react-redux';
import { className } from './index.scss';
import handleChangeSize from './handleChangeSize';

const mapStateToProps = state => ({
  app: state.map.editor.app,
});

const Tool = ({
  app,
  dispatch,
}) => {
  const { size } = app;

  return (
    <nav className={className}>
      <div className="size">
        <button
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

Tool.propTypes = {
  app: shape({
    size: number,
  }).isRequired,
  dispatch: func.isRequired,
};

export default connect(mapStateToProps)(Tool);
