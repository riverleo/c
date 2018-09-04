/* global window */

import _ from 'lodash';
import axios from 'axios';
import { fromJS } from 'immutable';
import types from '../types';
import { set } from '../../redux';

export default ({
  data,
  aside,
  dispatch,
}) => () => {
  const index = _.findIndex(aside[types.TERRAIN], i => i.id === data.id);

  if (index === -1) { return; }
  if (!window.confirm('정말로 삭제하시겠습니까?')) { return; }

  const items = fromJS(aside[types.TERRAIN]).delete(index).toJS();

  dispatch(set({ [types.TERRAIN]: items }));
  axios.delete(`/terrains/${data.id}`);
};
