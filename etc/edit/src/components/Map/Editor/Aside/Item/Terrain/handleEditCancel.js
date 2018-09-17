import { set } from '../../redux';

export default ({
  dispatch,
}) => () => dispatch(set({ editable: undefined }));
