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

    if (_.isNil(layout.get(x))) {
      layout = layout.set(x, List());
    }

    if (_.isNil(layout.get(x).get(y))) {
      layout = layout.setIn([x, y], List());
    }

    const count = layout.getIn([x, y]).count();

    if (chop === 'erase') {
      return layout.setIn([x, y], List());
    }

    return layout.setIn([x, y, count], chop);
  }).toJS();

  axios.post(`/maps/${map.id}`, map);
  dispatch(set({ map }));
};
