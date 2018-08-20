/* global window */

import _ from 'lodash';
import axios from 'axios';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  func,
  shape,
  string,
  object,
  arrayOf,
} from 'prop-types';
import { set } from '../redux';
import types from './types';

const mapStateToProps = state => ({
  aside: state.map.editor.aside,
});

class Building extends Component {
  static propTypes = {
    data: shape({
      id: string.isRequired,
      name: string.isRequired,
    }).isRequired,
    aside: shape({
      buildings: arrayOf(object),
    }).isRequired,
    dispatch: func.isRequired,
  };

  handleRemove = () => {
    const {
      data,
      aside,
      dispatch,
    } = this.props;
    const index = _.findIndex(aside[types.BUILDING], i => i.id === data.id);

    if (index === -1) { return; }
    if (!window.confirm('정말로 삭제하시겠습니까?')) { return; }

    const items = fromJS(aside[types.BUILDING]).delete(index).toJS();

    dispatch(set({ [types.BUILDING]: items }));
    axios.delete(`/buildings/${data.id}`);
  }

  render() {
    const { data } = this.props;
    const {
      id,
      name,
    } = data;

    return (
      <li>
        <dl>
          <dt>
            {name}
          </dt>
          <dd>
            {id}
          </dd>
        </dl>
        <button
          type="submit"
          onClick={this.handleRemove}
        >
          삭제
        </button>
      </li>
    );
  }
}

export default connect(mapStateToProps)(Building);
