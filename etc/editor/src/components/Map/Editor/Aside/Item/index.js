import _ from 'lodash';
import React from 'react';
import {
  oneOf,
  shape,
} from 'prop-types';
import types from './types';
import Terrain from './Terrain';
import Building from './Building';

const Item = ({ data }) => {
  switch (data.type) {
    case types.TERRAIN:
      return <Terrain data={data} />;
    case types.BUILDING:
      return <Building data={data} />;
    default:
      return `지원하지 않는 타입(${data.type})입니다`;
  }
};

Item.propTypes = {
  data: shape({
    type: oneOf(_.values(types)).isRequired,
  }).isRequired,
};

export default Item;
export { default as types } from './types';
