import _ from 'lodash';
import React from 'react';
import {
  shape,
  string,
} from 'prop-types';
import List from './List';
import Editor from './Editor';

const Map = ({ match: { params: { id } } }) => (_.isNil(id) ? <List /> : <Editor id={id} />);

Map.propTypes = {
  match: shape({
    params: shape({
      id: string,
    }).isRequired,
  }).isRequired,
};

export default Map;
