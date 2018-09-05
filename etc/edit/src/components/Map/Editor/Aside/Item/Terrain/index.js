import _ from 'lodash';
import cn from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import {
  func,
  shape,
  number,
  string,
  object,
  arrayOf,
} from 'prop-types';
import Drop from 'react-dropzone';
import { className } from './index.scss';
import handleDrop from './handleDrop';
import handleClick from './handleClick';
import handleSelect from './handleSelect';
import handleChange from './handleChange';
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
  const {
    hash,
    active,
    selected,
  } = aside;
  const {
    path,
  } = selected || {};
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
              <input
                type="text"
                value={name}
                onChange={
                  handleChange({
                    key: 'name',
                    data,
                    aside,
                    dispatch,
                  })
                }
              />
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
                    className={cn('chop', { active: path === c })}
                    onClick={
                      handleSelect({
                        chop: c,
                        dispatch,
                      })
                    }
                  >
                    <i style={{ backgroundImage: `url('${c}?${hash}')` }} />
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
    hash: number,
    active: string,
    terrains: arrayOf(object),
  }).isRequired,
  dispatch: func.isRequired,
};

export default connect(mapStateToProps)(Terrain);
