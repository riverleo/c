/* global window */

import _ from 'lodash';
import axios from 'axios';
import { fromJS } from 'immutable';
import { set } from '../redux';

export default ({
  id,
  list,
  dispatch,
}) => () => {
  const index = _.findIndex(list.maps, i => i.id === id);

  if (index === -1) { return; }
  if (!window.confirm('정말로 삭제하시겠습니까?')) { return; }

  const maps = fromJS(list.maps).delete(index).toJS();

  dispatch(set({
    maps,
    selected: undefined,
  }));
  axios.delete(`/maps/${id}`);
};
