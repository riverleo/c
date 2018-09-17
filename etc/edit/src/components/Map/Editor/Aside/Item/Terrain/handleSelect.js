import _ from 'lodash';
import { set as asideSet } from '../../redux';
import { set as appSet } from '../../../redux';

export default ({
  chop,
  data,
  dispatch,
}) => () => {
  const props = _.omitBy({
    selectedTerrain: data,
    selectedTerrainChop: chop,
  }, o => _.isNil(o));

  dispatch(appSet(props));
  dispatch(asideSet(props));
};
