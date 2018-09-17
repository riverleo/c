import _ from 'lodash';
import axios from 'axios';
import { fromJS } from 'immutable';
import { set } from '../redux';

export default ({
  map: prevMap,
  dispatch,
  selectedTerrainChop,
}) => () => {
  if (_.isNil(selectedTerrainChop)) { return; }

  const chop = selectedTerrainChop === 'erase' ? null : selectedTerrainChop;
  const map = fromJS(prevMap).set('chop', chop).toJS();

  axios.put(`/maps/${map.id}`, { chop });

  dispatch(set({ map }));
};
