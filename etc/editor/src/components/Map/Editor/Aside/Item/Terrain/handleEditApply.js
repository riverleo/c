import _ from 'lodash';
import axios from 'axios';
import { fromJS } from 'immutable';
import { set } from '../../redux';

export default ({
  data,
  terrain: prevTerrain,
  editable,
  dispatch,
}) => () => {
  const index = _.findIndex(prevTerrain, t => t.id === editable.id);
  const terrain = fromJS(prevTerrain).set(index, editable).toJS();

  const indexes = [];

  _.forEach(data.chops, (chop, i) => {
    if (_.includes(editable.chops, chop)) {
      return;
    }

    indexes.push(i);
  });

  if (_.isEmpty(indexes)) {
    dispatch(set({ editable: undefined }));

    return;
  }

  axios.delete(`/terrains/${data.id}/sprite/${_.join(indexes)}`);

  dispatch(set({
    terrain,
    editable: undefined,
  }));
};
