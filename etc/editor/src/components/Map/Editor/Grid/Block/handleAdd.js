import _ from 'lodash';
import axios from 'axios';
import {
  List,
  fromJS,
} from 'immutable';
import { set } from '../../redux';

export default ({
  x,
  y,
  map: prevMap,
  chop,
  dispatch,
}) => () => {
  if (_.isNil(chop)) { return; }

  const map = fromJS(prevMap).updateIn(['layout'], (rawLayout) => {
    let layout = rawLayout;

    if (_.isNil(layout)) {
      layout = List();
    }

    if (_.isNil(layout.get(y))) {
      layout = layout.set(y, List());
    }

    if (_.isNil(layout.get(y).get(x))) {
      layout = layout.setIn([y, x], List());
    }

    const count = layout.getIn([y, x]).count();

    if (chop === 'erase') {
      return layout.setIn([y, x], List());
    }

    return layout.setIn([y, x, count], chop);
  }).toJS();

  axios.post(`/maps/${map.id}`, map);
  dispatch(set({ map }));
};
