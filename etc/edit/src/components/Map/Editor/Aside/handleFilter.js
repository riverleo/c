import _ from 'lodash';
import { set } from './redux';

export default ({
  input,
  aside,
  dispatch,
}) => () => {
  const { type } = aside;
  const { value } = input.current;

  let filtered;

  if (!_.isEmpty(value)) {
    filtered = _.map(_.filter(aside[type], i => _.includes(i.name, value)), o => o.id);
  }

  dispatch(set({ filtered }));
};
