/* global window */

import _ from 'lodash';
import axios from 'axios';
import { fromJS } from 'immutable';
import { set } from '../../redux';
import { set as appSet } from '../../../redux';

export default ({
  data,
  aside,
  dispatch,
}) => (files) => {
  const formData = new window.FormData();
  const headers = { 'content-type': 'multipart/form-data' };

  _.forEach(files, f => formData.append('sprite', f));

  axios.post(`/terrains/${data.id}`, formData, { headers })
    .then(({ data: changed }) => {
      const { terrain } = fromJS(aside).updateIn(['terrain'], (arr) => {
        const index = arr.findIndex(o => o.get('id') === changed.id);

        if (index < 0) { return arr; }

        return arr.set(index, fromJS(changed));
      }).toJS();

      const hash = new Date().getTime();

      dispatch(appSet({ hash }));
      dispatch(set({
        hash,
        terrain,
      }));
    })
    .catch(() => window.alert('600x300 규격의 이미지만 사용 가능합니다.'));
};
