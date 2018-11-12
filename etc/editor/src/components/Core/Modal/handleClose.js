import _ from 'lodash';

export default ({ onClose }) => () => {
  if (_.isNil(onClose)) { return; }

  onClose();
};
