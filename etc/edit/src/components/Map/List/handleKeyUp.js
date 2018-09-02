import _ from 'lodash';
import axios from 'axios';
import { fromJS } from 'immutable';
import { set } from './redux';
import newId from '../../../../lib/newId';
import handleChange from './handleChange';

export default ({
  list,
  input,
  dispatch,
}) => (e) => {
  const { maps } = list;
  const name = input.current.value;
  const exists = _.find(maps, m => m.name === name);

  if (exists) { return; }
  if (_.isEmpty(name)) { return; }
  if (e.keyCode !== 13) { return; }

  axios.post(`/maps/${newId()}`, { name })
    .then(({ data: map }) => dispatch(set({ maps: fromJS(maps).insert(0, map).toJS() })));

  input.current.value = ''; // eslint-disable-line no-param-reassign
  handleChange({
    list,
    input,
    dispatch,
  })();
};
