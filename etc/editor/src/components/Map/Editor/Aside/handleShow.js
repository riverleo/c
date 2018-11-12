import { set } from './redux';

export default ({
  show,
  current,
  dispatch,
}) => () => {
  if (show === current) { return; }

  dispatch(set({ show }));
};
