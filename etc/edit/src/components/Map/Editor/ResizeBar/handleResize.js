import _ from 'lodash';
import axios from 'axios';
import {
  List,
  fromJS,
} from 'immutable';
import DIRECTION from './DIRECTION';
import { set } from '../redux';

export default ({
  map: prevMap,
  size,
  dispatch,
  direction,
}) => () => {
  const {
    TOP,
    LEFT,
    RIGHT,
    BOTTOM,
  } = DIRECTION;

  let map = fromJS(prevMap);

  const width = map.get('width');
  const height = map.get('height');

  if (_.includes([TOP, BOTTOM], direction)) {
    if (height <= 0) { return; }

    map = map.update('height', h => h + size);
  }

  if (_.includes([LEFT, RIGHT], direction)) {
    if (width <= 0) { return; }

    map = map.update('width', w => w + size);
  }

  map = map.update('layout', (rawLayout) => {
    let layout = rawLayout || List();

    switch (direction) {
      case TOP:
        _.times(Math.abs(size), () => {
          if (size > 0) {
            layout = layout.unshift(null);
          } else {
            layout = layout.shift();
          }
        });
        break;
      case LEFT:
        _.times(layout.count(), (index) => {
          if (size > 0) {
            layout = layout.update(index, (arr) => {
              if (_.isNil(arr)) { return arr; }

              return arr.unshift(..._.times(size, () => null));
            });
          } else {
            layout = layout.update(index, (arr) => {
              if (_.isNil(arr)) { return arr; }

              return arr.splice(0, Math.abs(size));
            });
          }
        });
        break;
      case RIGHT:
        _.times(layout.count(), (index) => {
          if (size < 0) {
            layout = layout.update(index, (arr) => {
              if (_.isNil(arr)) { return arr; }

              return arr.splice(arr.count() - size);
            });
          }
        });
        break;
      case BOTTOM:
        _.times(Math.abs(size), () => {
          if (layout.count() >= layout.get('height') && size < 0) {
            layout = layout.pop();
          }
        });
        break;
      default:
        throw new Error(`알 수 없는 방향(${direction})입니다`);
    }

    return layout;
  }).toJS();

  axios.post(`/maps/${map.id}`, map);
  dispatch(set({ map }));
};
