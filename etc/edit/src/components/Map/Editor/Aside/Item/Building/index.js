/* global window */

import _ from 'lodash';
import cn from 'classnames';
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
import Drop from 'react-dropzone';
import types from '../types';
import { set } from '../../redux';
import { className } from './index.scss';

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

  state = {
    show: false,
  }

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

  handleDrop = (files) => {
    const { data } = this.props;
    const formData = new window.FormData();
    const headers = { 'content-type': 'multipart/form-data' };

    _.forEach(files, f => formData.append('sprite', f));

    axios.post(`/buildings/${data.id}`, formData, { headers });
  }

  render() {
    const { data } = this.props;
    const { show } = this.state;
    const {
      id,
      name,
    } = data;

    return (
      <li className={className}>
        <header>
          <button
            type="button"
            className="item"
          >
            <dl>
              <dt>
                {name}
              </dt>
              <dd>
                {id}
              </dd>
            </dl>
          </button>
          <button
            type="button"
            onClick={this.handleRemove}
            className="remove"
          >
            삭제
          </button>
        </header>
        <div className={cn('body', { show })}>
          <Drop
            accept="image/png"
            onDrop={this.handleDrop}
            multiple={false}
            className="new"
          >
            이미지를 추가 또는 변경
          </Drop>
          <div>
            <input
              type="number"
              placeholder="넓이"
            />
            <input
              type="number"
              placeholder="높이"
            />
          </div>
        </div>
      </li>
    );
  }
}

export default connect(mapStateToProps)(Building);
