import _ from 'lodash';
import { set } from '../redux';

export default ({
  size: rawSize,
  dispatch,
}) => (e) => {
  const { value } = e.target;
  const size = _.toNumber(rawSize || value || 60);

  dispatch(set({ size }));
};
