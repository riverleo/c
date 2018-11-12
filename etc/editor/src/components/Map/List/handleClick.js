import { set } from './redux';

export default ({
  map,
  dispatch,
}) => () => dispatch(set({ selected: map.id }));
