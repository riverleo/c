import axios from 'axios';
import { fromJS } from 'immutable';
import { set } from '../../redux';

export default ({
  key,
  data,
  aside,
  dispatch,
}) => (e) => {
  const { value } = e.target;
  const changed = {
    ...data,
    [key]: value,
  };

  const { terrain } = fromJS(aside).updateIn(['terrain'], (arr) => {
    const index = arr.findIndex(o => o.get('id') === data.id);

    if (index < 0) { return terrain; }

    return arr.set(index, fromJS(changed));
  }).toJS();

  dispatch(set({ terrain }));
  axios.put(`/terrains/${data.id}`, changed);
};
