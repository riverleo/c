import _ from 'lodash';
import React from 'react';
import {
  func,
  shape,
  number,
  string,
  arrayOf,
} from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { className } from './index.scss';
import handleChange from './handleChange';
import handleRemove from './handleRemove';

const mapStateToProps = state => ({
  list: state.map.list,
});

const INPUT_PROPS = [
  {
    key: 'name',
    type: 'string',
    placeholder: '이름',
  },
  {
    key: 'width',
    type: 'number',
    placeholder: '넓이 (블럭 수)',
  },
  {
    key: 'height',
    type: 'number',
    placeholder: '높이 (블럭 수)',
  },
];

const PropertyEditor = ({
  list,
  dispatch,
}) => {
  const {
    maps,
    selected,
  } = list;
  const map = _.find(maps, m => m.id === selected);

  return (
    <div className={className}>
      {
        _.map(INPUT_PROPS, ({
          key,
          type,
          placeholder,
        }) => (
          <input
            key={key}
            type="text"
            value={map[key] || ''}
            onChange={
              handleChange({
                map,
                key,
                type,
                list,
                dispatch,
              })
            }
            placeholder={placeholder}
          />
        ))
      }
      <Link to={`/maps/${map.id}`}>
        편집
      </Link>
      <button
        type="button"
        onClick={
          handleRemove({
            id: map.id,
            list,
            dispatch,
          })
        }
      >
        삭제
      </button>
    </div>
  );
};

PropertyEditor.propTypes = {
  list: shape({
    maps: arrayOf(shape({
      id: string.isRequired,
      name: string,
      width: number,
      height: number,
    })).isRequired,
    selected: string.isRequired,
  }).isRequired,
  dispatch: func.isRequired,
};

export default connect(mapStateToProps)(PropertyEditor);
