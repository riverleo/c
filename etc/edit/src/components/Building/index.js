import _ from 'lodash';
import axios from 'axios';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  func,
  shape,
  string,
  object,
  arrayOf,
} from 'prop-types';
import Empty from '../core/Empty';
import Editor from '../core/Editor';
import Sidebar from '../core/Sidebar';
import { className } from './index.scss';
import { set } from './redux';

const mapStateToProps = state => ({
  building: state.building,
});

class Building extends Component {
  static propTypes = {
    match: shape({
      params: shape({
        id: string,
      }).isRequired,
    }).isRequired,
    building: shape({
      data: arrayOf(object),
    }).isRequired,
    baseURL: string,
    dispatch: func.isRequired,
  }

  static defaultProps = {
    baseURL: '/buildings',
  }

  componentDidMount() {
    const {
      baseURL,
      dispatch,
    } = this.props;

    axios.get(baseURL).then(({ data }) => dispatch(set({ data })));
  }

  componentDidUpdate() {
    const {
      match,
      baseURL,
      dispatch,
      building,
    } = this.props;
    const { id } = match.params;

    if (_.has(building, id)) { return; }

    axios.get(`${baseURL}/${id}`).then(({ data }) => dispatch(set({ [id]: data })));
  }

  handleChange = (data) => {
    const { dispatch } = this.props;

    dispatch(set({ data }));
  }

  render() {
    const {
      match,
      baseURL,
      building,
    } = this.props;
    const { params } = match;
    const { data } = building;
    const { id } = params;

    return (
      <div className={className}>
        <Sidebar
          data={data}
          baseURL={baseURL}
          onChange={this.handleChange}
        />
        {_.isNil(id) ? <Empty /> : <Editor data={building[id]} />}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Building);
