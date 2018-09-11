import _ from 'lodash';
import cn from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import {
  any,
  func,
  shape,
  oneOf,
  objectOf,
} from 'prop-types';
import _DIRECTION from './DIRECTION';
import { className } from './index.scss';
import handleResize from './handleResize';

const mapStateToProps = state => ({
  app: state.map.editor.app,
});

const Expander = ({
  app,
  dispatch,
  direction,
}) => {
  const { map } = app;

  if (_.isNil(map)) { return null; }

  return (
    <div className={cn(className, direction)}>
      <button
        type="button"
        onClick={
          handleResize({
            map,
            size: 1,
            dispatch,
            direction,
          })
        }
        className="increment"
      />
      <button
        type="button"
        onClick={
          handleResize({
            map,
            size: -1,
            dispatch,
            direction,
          })
        }
        className="decrement"
      />
    </div>
  );
};

Expander.propTypes = {
  app: shape({
    map: objectOf(any),
  }).isRequired,
  dispatch: func.isRequired,
  direction: oneOf(_.values(_DIRECTION)).isRequired,
};

export const DIRECTION = _DIRECTION;
export default connect(mapStateToProps)(Expander);
