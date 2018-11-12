import _ from 'lodash';
import axios from 'axios';
import { fromJS } from 'immutable';
import { set } from '../redux';

export default ({
  map,
  key,
  type,
  list,
  dispatch,
}) => (e) => {
  let { value } = e.target;

  if (_.isEmpty(value)) {
    value = null;
  } else if (type === 'number') {
    value = _.toNumber(value);
  }

  const changed = {
    ...map,
    [key]: value,
  };

  const maps = fromJS(list.maps).update((items) => {
    if (_.isNil(items)) { return items; }

    const { id } = changed;
    const index = items.findIndex(m => m.get('id') === id);

    if (index === -1) {
      console.warn(`존재하지 않는 맵 아이디(${id})입니다.`);

      return items;
    }

    return items.set(index, changed);
  }).toJS();

  dispatch(set({ maps }));
  axios.put(`/maps/${map.id}`, changed);
};
