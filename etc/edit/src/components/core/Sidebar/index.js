import _ from 'lodash';
import React, {
  Component,
  createRef,
} from 'react';
import {
  func,
  string,
  object,
  arrayOf,
} from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { fromJS } from 'immutable';
import { className } from './index.scss';
import newId from '../../../../lib/newId';

class Sidebar extends Component {
  static propTypes = {
    data: arrayOf(object),
    baseURL: string.isRequired,
    onChange: func.isRequired,
  }

  static defaultProps = {
    data: [],
  }

  constructor(props) {
    super(props);

    this.input = createRef();
  }

  state = {
    filtered: undefined,
  }

  fetch = () => {
    const {
      baseURL,
      onChange,
    } = this.props;

    axios.get(baseURL)
      .then(({ data }) => onChange(data));
  }

  create = (name) => {
    const {
      baseURL,
      onChange,
    } = this.props;

    axios.post(`${baseURL}/${newId()}`, { name })
      .then(({ data: o }) => {
        const { data } = this.props;

        onChange(fromJS(data).insert(0, o).toJS());
      });
  }

  remove = id => () => {
    const {
      baseURL,
      onChange,
    } = this.props;

    axios.delete(`${baseURL}/${id}`)
      .then(() => {
        const { data } = this.props;
        const index = _.findIndex(data, o => o.id === id);

        onChange(fromJS(data).remove(index).toJS());
      });
  }

  handleKeyUp = (e) => {
    const { data } = this.props;
    const name = this.input.current.value;
    const exists = _.find(data, o => o.name === name);

    if (exists) { return; }
    if (_.isEmpty(name)) { return; }
    if (e.keyCode !== 13) { return; }

    this.create(this.input.current.value);
    this.input.current.value = '';
    this.handleChange();
  }

  handleChange = () => {
    const { data } = this.props;
    const { value } = this.input.current;

    if (_.isEmpty(value)) {
      this.setState({ filtered: undefined });
    } else {
      const filtered = _.filter(data, o => _.includes(o.name, value));

      this.setState({ filtered });
    }
  }

  render() {
    const {
      data,
      baseURL,
    } = this.props;
    const { filtered } = this.state;
    const { value } = this.input.current || {};

    return (
      <aside className={className}>
        <div id="create">
          <input
            ref={this.input}
            type="text"
            onKeyUp={this.handleKeyUp}
            onChange={this.handleChange}
            placeholder="검색 또는 신규추가"
          />
        </div>
        <ul>
          {
            _.map(filtered || data, o => (
              <li key={o.id}>
                <Link to={`${baseURL}/${o.id}`}>
                  <dl>
                    <dt>
                      {o.name}
                    </dt>
                    <dd>
                      {o.id}
                    </dd>
                  </dl>
                </Link>
                <button
                  type="submit"
                  onClick={this.remove(o.id)}
                >
                  삭제
                </button>
              </li>
            ))
          }
        </ul>
      </aside>
    );
  }
}

export default Sidebar;
