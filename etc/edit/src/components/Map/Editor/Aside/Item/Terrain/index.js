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
import newId from '../../../../../../../lib/newId';

const mapStateToProps = state => ({
  aside: state.map.editor.aside,
});

class Terrain extends Component {
  static propTypes = {
    data: shape({
      id: string.isRequired,
      name: string.isRequired,
    }).isRequired,
    aside: shape({
      terrains: arrayOf(object),
    }).isRequired,
    dispatch: func.isRequired,
  };

  state = {
    show: false,
    hash: newId(),
  }

  handleRemove = () => {
    const {
      data,
      aside,
      dispatch,
    } = this.props;
    const index = _.findIndex(aside[types.TERRAIN], i => i.id === data.id);

    if (index === -1) { return; }
    if (!window.confirm('정말로 삭제하시겠습니까?')) { return; }

    const items = fromJS(aside[types.TERRAIN]).delete(index).toJS();

    dispatch(set({ [types.TERRAIN]: items }));
    axios.delete(`/terrains/${data.id}`);
  }

  handleDrop = (files) => {
    const { data } = this.props;
    const formData = new window.FormData();
    const headers = { 'content-type': 'multipart/form-data' };

    _.forEach(files, f => formData.append('sprite', f));

    axios.post(`/terrains/${data.id}`, formData, { headers });
    this.setState({ hash: newId() });
  }

  handleShow = show => () => this.setState({ show })

  render() {
    const { data } = this.props;
    const {
      show,
      hash,
    } = this.state;
    const {
      id,
      name,
      choppeds,
    } = data;

    return (
      <li className={className}>
        <header>
          <button
            type="button"
            className="item"
            onClick={this.handleShow(!show)}
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
          <div className="choppeds">
            {
              _.map(choppeds, c => (
                <button
                  key={c}
                  type="button"
                  className="chopped"
                >
                  <i style={{ backgroundImage: `url('${c}?${hash}')` }} />
                </button>
              ))
            }
          </div>
        </div>
      </li>
    );
  }
}

export default connect(mapStateToProps)(Terrain);
