import { fromJS } from 'immutable';
import { set } from '../../redux';

export default ({
  chop,
  editable: prevEditable,
  dispatch,
}) => () => {
  const editable = fromJS(prevEditable).update('chops', (chops) => {
    const index = chops.findIndex(c => c === chop);

    if (index < 0) { return chops; }

    return chops.delete(index);
  }).toJS();

  dispatch(set({ editable }));
};
