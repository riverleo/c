import _ from 'lodash';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import React, {
  Component,
  createRef,
} from 'react';
import {
  func,
  shape,
  string,
  arrayOf,
} from 'prop-types';
import { set } from './redux';
import { className } from './index.scss';
import newId from '../../../../lib/newId';

const mapStateToProps = state => ({
  list: state.map.list,
});

class List extends Component {
  static propTypes = {
    list: shape({
      maps: arrayOf(shape({
        id: string.isRequired,
      })),
    }).isRequired,
    dispatch: func.isRequired,
  }

  constructor(props) {
    super(props);

    this.input = createRef();
  }

  state = {
    filtered: undefined,
  }

  componentDidMount() {
    const { dispatch } = this.props;

    axios.get('/maps').then(({ data: maps }) => dispatch(set({ maps })));
  }

  handleKeyUp = (e) => {
    const {
      list,
      dispatch,
    } = this.props;
    const { maps } = list;
    const name = this.input.current.value;
    const exists = _.find(maps, m => m.name === name);

    if (exists) { return; }
    if (_.isEmpty(name)) { return; }
    if (e.keyCode !== 13) { return; }

    axios.post(`/maps/${newId()}`, { name })
      .then(({ data: map }) => dispatch(set({ maps: fromJS(maps).insert(0, map).toJS() })));

    this.input.current.value = '';
    this.handleChange();
  }

  handleChange = () => {
    const { list } = this.props;
    const { maps } = list;
    const { value } = this.input.current;

    let filtered;

    if (!_.isEmpty(value)) {
      filtered = _.filter(maps, m => _.includes(m.name, value));
    }

    this.setState({ filtered });
  }

  render() {
    const { list } = this.props;
    const { maps } = list;
    const { filtered } = this.state;

    return (
      <div className={className}>
        <input
          ref={this.input}
          type="text"
          onKeyUp={this.handleKeyUp}
          onChange={this.handleChange}
          placeholder="검색 또는 신규추가"
        />
        <ul>
          {
            _.map(filtered || maps, m => (
              <li key={m.id}>
                <Link to={`/maps/${m.id}`}>
                  <dl>
                    <dt>
                      {m.name}
                    </dt>
                    <dd>
                      {m.id}
                    </dd>
                  </dl>
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps)(List);
