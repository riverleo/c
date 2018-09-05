import { set } from './redux';

export default ({
  type,
  dispatch,
}) => () => dispatch(set({ type }));
