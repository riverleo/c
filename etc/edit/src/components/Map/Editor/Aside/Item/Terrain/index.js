import _ from 'lodash';
import cn from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import {
  func,
  shape,
  string,
  object,
  arrayOf,
} from 'prop-types';
import Drop from 'react-dropzone';
import { className } from './index.scss';
import handleDrop from './handleDrop';
import handleClick from './handleClick';
import handleRemove from './handleRemove';

const mapStateToProps = state => ({
  aside: state.map.editor.aside,
});

const Terrain = (props) => {
  const {
    data,
    aside,
    dispatch,
  } = props;
  const { active } = aside;
  const {
    id,
    name,
    chops,
  } = data;

  return (
    <li className={className}>
      <header>
        <button
          type="button"
          className="item"
          onClick={
            handleClick({
              data,
              aside,
              dispatch,
            })
          }
        >
          <dl>
            <dt>
              {name}
            </dt>
            <dd>
              {id}
            </dd>
          </dl>
        </button>
      </header>
      <div className={cn('body', { active: active === data.id })}>
        <menu>
          <Drop
            accept="image/png"
            onDrop={
              handleDrop({
                data,
                aside,
                dispatch,
              })
            }
            multiple={false}
            className="add"
          >
            이미지 추가
          </Drop>
          <button
            type="button"
            onClick={
              handleRemove({
                data,
                aside,
                dispatch,
              })
            }
            className="remove"
          >
            삭제
          </button>
        </menu>
        {
          _.size(chops) > 0 && (
            <div className="chops">
              {
                _.map(chops, c => (
                  <button
                    key={c}
                    type="button"
                    className="chop"
                  >
                    <i style={{ backgroundImage: `url('${c}')` }} />
                  </button>
                ))
              }
            </div>
          )
        }
      </div>
    </li>
  );
};

Terrain.propTypes = {
  data: shape({
    id: string.isRequired,
    name: string.isRequired,
  }).isRequired,
  aside: shape({
    active: string,
    terrains: arrayOf(object),
  }).isRequired,
  dispatch: func.isRequired,
};

export default connect(mapStateToProps)(Terrain);
