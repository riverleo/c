import _ from 'lodash';
import { set as asideSet } from '../../redux';
import { set as appSet } from '../../../redux';

export default ({
  chop,
  terrain,
  building,
  dispatch,
}) => () => {
  const props = _.omitBy({
    selectedTerrain: terrain,
    selectedTerrainChop: chop,
    selectedBuilding: building,
  }, o => _.isNil(o));

  dispatch(appSet(props));
  dispatch(asideSet(props));
};
