import _ from 'lodash';
import {
  List,
  fromJS,
} from 'immutable';
import { set } from '../redux';

export default ({
  x,
  y,
  map: prevMap,
  selected,
  dispatch,
}) => () => {
  console.log({ selected });
  if (_.isNil(selected)) { return; }

  const map = fromJS(prevMap).updateIn(['layout'], (rawLayout) => {
    let layout = rawLayout;

    if (_.isNil(layout)) {
      layout = List();
    }

    if (_.isNil(layout.get(x))) {
      layout = layout.set(x, List());
    }

    return layout.setIn([x, y], selected);
  }).toJS();

  dispatch(set({ map }));
};
