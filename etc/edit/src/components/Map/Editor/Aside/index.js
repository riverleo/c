import _ from 'lodash';
import cn from 'classnames';
import { connect } from 'react-redux';
import React, {
  Component,
  createRef,
} from 'react';
import {
  func,
  shape,
  object,
  arrayOf,
} from 'prop-types';
import axios from 'axios';
import Promise from 'bluebird';
import { fromJS } from 'immutable';
import { className } from './index.scss';
import Item, { types } from './Item';
import { set } from './redux';
import newId from '../../../../../lib/newId';

const mapStateToProps = state => ({
  aside: state.map.editor.aside,
});

class Aside extends Component {
  static propTypes = {
    aside: shape({
      texture: arrayOf(object),
      building: arrayOf(object),
    }).isRequired,
    dispatch: func.isRequired,
  }

  constructor(props) {
    super(props);

    this.input = createRef();
  }

  state = {
    hide: false,
    active: types.TEXTURE,
    filtered: undefined,
  }

  componentDidMount() {
    const { dispatch } = this.props;

    Promise.all([
      axios.get('/textures'),
      axios.get('/buildings'),
    ]).then(data => dispatch(set({
      [types.TEXTURE]: _.get(data, [0, 'data']),
      [types.BUILDING]: _.get(data, [1, 'data']),
    })));
  }

  handleKeyUp = (e) => {
    const {
      aside,
      dispatch,
    } = this.props;
    const { active } = this.state;
    const items = aside[active];
    const name = this.input.current.value;
    const exists = _.find(aside[active], i => i.name === name);

    if (exists) { return; }
    if (_.isEmpty(name)) { return; }
    if (e.keyCode !== 13) { return; }

    let baseURL;

    switch (active) {
      case types.TEXTURE:
        baseURL = '/textures';
        break;
      case types.BUILDING:
        baseURL = '/buildings';
        break;
      default:
        throw new Error(`신규생성을 지원하지 않는 타입(${active})입니다.`);
    }

    axios.post(`${baseURL}/${newId()}`, { name })
      .then(({ data }) => dispatch(set({ [active]: fromJS(items).insert(0, data).toJS() })));

    this.input.current.value = '';
    this.handleChange();
  }

  handleChange = () => {
    const { aside } = this.props;
    const { active } = this.state;
    const { value } = this.input.current;

    let filtered;

    if (!_.isEmpty(value)) {
      filtered = _.filter(aside[active], i => _.includes(i.name, value));
    }

    this.setState({ filtered });
  }

  handleClickType = active => () => this.setState({ active })

  handleClickToggle = hide => () => this.setState({ hide })

  render() {
    const { aside } = this.props;
    const {
      hide,
      active,
      filtered,
    } = this.state;

    return (
      <aside className={cn(className, { hide })}>
        <nav>
          <button
            id="toggle"
            className={cn({ hide })}
            onClick={this.handleClickToggle(!hide)}
          >
            <i />
            <i />
            <i />
          </button>
          <div id="tabs">
            {
              _.map(types, type => (
                <button
                  key={type}
                  type="button"
                  onClick={this.handleClickType(type)}
                  className={cn({ active: active === type })}
                >
                  {
                    (() => {
                      switch(type) {
                        case types.TEXTURE:
                          return '지형';
                        case types.BUILDING:
                          return '건물';
                        default:
                          return '????';
                      }
                    })()
                  }
                </button>
              ))
            }
          </div>
        </nav>
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
          {_.map(filtered || aside[active], i => <Item key={i.id} data={i} />)}
        </ul>
      </aside>
    );
  }
}

export default connect(mapStateToProps)(Aside);
