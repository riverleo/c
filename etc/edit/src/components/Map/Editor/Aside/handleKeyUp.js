import _ from 'lodash';
import axios from 'axios';
import { fromJS } from 'immutable';
import { types } from './Item';
import { set } from './redux';
import newId from '../../../../../lib/newId';
import handleFilter from './handleFilter';

export default ({
  input,
  aside,
  dispatch,
}) => (e) => {
  const { active } = aside;
  const items = aside[active];
  const name = input.current.value;
  const exists = _.find(aside[active], i => i.name === name);

  if (exists) { return; }
  if (_.isEmpty(name)) { return; }
  if (e.keyCode !== 13) { return; }

  let baseURL;

  switch (active) {
    case types.TERRAIN:
      baseURL = '/terrains';
      break;
    case types.BUILDING:
      baseURL = '/buildings';
      break;
    default:
      throw new Error(`신규생성을 지원하지 않는 타입(${active})입니다.`);
  }

  axios.post(`${baseURL}/${newId()}`, { name })
    .then(({ data }) => dispatch(set({ [active]: fromJS(items).insert(0, data).toJS() })));

  input.current.value = ''; // eslint-disable-line no-param-reassign
  handleFilter({
    input,
    aside,
    dispatch,
  });
};
