import _ from 'lodash';
import { set } from '../../redux';

export default ({
  chop,
  dispatch,
}) => () => {
  const path = _.split(chop, '?')[0];
  const [, type, id,, index] = _.split(path, '/');

  const selected = {
    key: `${type}_${id}_${index}`,
    path,
  };

  dispatch(set({ selected }));
};
