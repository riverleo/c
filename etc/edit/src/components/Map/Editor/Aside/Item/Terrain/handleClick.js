import types from '../types';
import { set } from '../../redux';

export default ({
  data,
  aside,
  dispatch,
}) => () => {
  const { type } = data;
  const {
    selectedTerrain,
    selectedBuilding,
  } = aside;

  switch (type) {
    case types.TERRAIN: {
      const { id } = selectedTerrain || {};
      const selected = id === data.id ? undefined : data;

      dispatch(set({ selectedTerrain: selected }));
      break;
    }
    case types.BUILDING: {
      const { id } = selectedBuilding || {};
      const selected = id === data.id ? undefined : data;

      dispatch(set({ selectedBuilding: selected }));
      break;
    }
    default:
      console.warn(`지원하지 않는 타입(${type})입니다.`);
  }
};
