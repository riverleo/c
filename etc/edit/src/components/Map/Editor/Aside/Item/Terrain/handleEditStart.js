import { set } from '../../redux';

export default ({
  data,
  dispatch,
}) => () => dispatch(set({ editable: data }));
