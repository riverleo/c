import _ from 'lodash';
import { set } from './redux';

export default ({
  list,
  input,
  dispatch,
}) => () => {
  const { maps } = list;
  const { value } = input.current;

  let filtered;

  if (!_.isEmpty(value)) {
    filtered = _.map(_.filter(maps, m => _.includes(m.name, value), m => m.id));
  }

  dispatch(set({ filtered }));
};
