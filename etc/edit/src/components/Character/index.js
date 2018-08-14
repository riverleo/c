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
  character: state.character,
});

class Character extends Component {
  static propTypes = {
    character: shape({
      data: arrayOf(object),
    }).isRequired,
    baseURL: string,
    dispatch: func.isRequired,
  }

  static defaultProps = {
    baseURL: '/characters',
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
      baseURL,
      character,
    } = this.props;
    const { data } = character;

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

export default connect(mapStateToProps)(Character);
