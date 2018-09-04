import { set } from '../../redux';

export default ({
  data,
  aside,
  dispatch,
}) => () => {
  const active = aside.active === data.id ? undefined : data.id;

  dispatch(set({ active }));
};
