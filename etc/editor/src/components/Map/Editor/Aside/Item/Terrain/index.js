import _ from 'lodash';
import cn from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import {
  func,
  shape,
  number,
  string,
} from 'prop-types';
import Drop from 'react-dropzone';
import types from '../types';
import { className } from './index.scss';
import handleDrop from './handleDrop';
import handleClick from './handleClick';
import handleSelect from './handleSelect';
import handleChange from './handleChange';
import handleRemove from './handleRemove';
import handleRemoveChop from './handleRemoveChop';
import handleEditStart from './handleEditStart';
import handleEditApply from './handleEditApply';
import handleEditCancel from './handleEditCancel';

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
    type,
    hash,
    terrain,
    editable,
    selectedTerrain,
    selectedTerrainChop,
    selectedBuilding,
  } = aside;
  const {
    id,
    name,
  } = data;
  const disabled = !_.isNil(editable);
  const { chops } = editable || data;

  let active;

  switch (type) {
    case types.TERRAIN:
      active = _.get(selectedTerrain, 'id');
      break;

    default:
    case types.BUILDING:
      active = _.get(selectedBuilding, 'id');
      break;
  }

  return (
    <li className={className}>
      <header>
        <button
          type="button"
          className="item"
          disabled={disabled}
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
                disabled={disabled}
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
            disabled={disabled}
            className={cn('add', { disabled })}
          >
            이미지 추가
          </Drop>
          <button
            type="button"
            onClick={
              (editable ? handleEditApply : handleEditStart)({
                data,
                terrain,
                editable,
                dispatch,
              })
            }
            className={cn('edit', { active: editable })}
          >
            {editable ? '완료' : '편집'}
          </button>
          <button
            type="button"
            onClick={
              (editable ? handleEditCancel : handleRemove)({
                data,
                aside,
                dispatch,
              })
            }
            className="remove"
          >
            {editable ? '취소' : '삭제'}
          </button>
        </menu>
        {
          _.size(chops) > 0 && (
            <div className="chops">
              {
                _.map(chops, chop => (
                  <button
                    key={chop}
                    type="button"
                    className={cn('chop', { active: chop === selectedTerrainChop })}
                    onClick={
                      (editable ? handleRemoveChop : handleSelect)({
                        chop,
                        data,
                        editable,
                        dispatch,
                      })
                    }
                  >
                    <i style={{ backgroundImage: `url('${chop}?${hash}')` }} />
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
    type: string,
    hash: number,
    selectedChop: string,
  }).isRequired,
  dispatch: func.isRequired,
};

export default connect(mapStateToProps)(Terrain);
