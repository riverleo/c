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
import { className } from './index.scss';
import { set } from './redux';
import Sidebar from '../core/Sidebar';

const mapStateToProps = state => ({
  map: state.map,
});

class Map extends Component {
  static propTypes = {
    map: shape({
      data: arrayOf(object),
    }).isRequired,
    baseURL: string,
    dispatch: func.isRequired,
  }

  static defaultProps = {
    baseURL: '/maps',
  }

  componentDidMount() {
    const {
      baseURL,
      dispatch,
    } = this.props;

    axios.get(baseURL).then(({ data }) => dispatch(set({ data })));
  }

  handleChange = (data) => {
    const { dispatch } = this.props;

    dispatch(set({ data }));
  }

  render() {
    const {
      map,
      baseURL,
    } = this.props;
    const { data } = map;

    return (
      <div className={className}>
        <Sidebar
          data={data}
          baseURL={baseURL}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Map);
