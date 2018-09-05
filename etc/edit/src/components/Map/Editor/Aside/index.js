import _ from 'lodash';
import cn from 'classnames';
import { connect } from 'react-redux';
import React, {
  Component,
  createRef,
} from 'react';
import {
  bool,
  func,
  shape,
  object,
  string,
  arrayOf,
} from 'prop-types';
import axios from 'axios';
import Promise from 'bluebird';
import { className } from './index.scss';
import Item, { types } from './Item';
import { set } from './redux';
import handleShow from './handleShow';
import handleKeyUp from './handleKeyUp';
import handleFilter from './handleFilter';
import handleChangeType from './handleChangeType';

const mapStateToProps = state => ({
  aside: state.map.editor.aside,
});

class Aside extends Component {
  static propTypes = {
    aside: shape({
      show: bool,
      terrain: arrayOf(object),
      building: arrayOf(object),
      filtered: arrayOf(string),
    }).isRequired,
    dispatch: func.isRequired,
  }

  constructor(props) {
    super(props);

    this.input = createRef();
  }

  componentDidMount() {
    const { dispatch } = this.props;

    Promise.all([
      axios.get('/terrains'),
      axios.get('/buildings'),
    ]).then(data => dispatch(set({
      show: true,
      type: types.TERRAIN,
      hash: new Date().getTime(),
      [types.TERRAIN]: _.get(data, [0, 'data']),
      [types.BUILDING]: _.get(data, [1, 'data']),
    })));
  }

  render() {
    const {
      aside,
      dispatch,
    } = this.props;
    const {
      show,
      type: currentType,
      filtered: filteredIds,
    } = aside;

    let filtered;

    if (!_.isNil(filteredIds)) {
      filtered = _.filter(aside[currentType], m => _.includes(filteredIds, m.id));
    }

    return (
      <aside
        role="presentation"
        className={cn(className, { show })}
        onClick={e => e.stopPropagation()}
      >
        <nav>
          <button
            id="toggle"
            type="button"
            className={cn({ show })}
            onClick={
              handleShow({
                show: !show,
                current: show,
                dispatch,
              })
            }
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
                  onClick={
                    handleChangeType({
                      type,
                      dispatch,
                    })
                  }
                  className={cn({ active: currentType === type })}
                >
                  {
                    (() => {
                      switch (type) {
                        case types.TERRAIN:
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
            onKeyUp={
              handleKeyUp({
                input: this.input,
                aside,
                dispatch,
              })
            }
            onChange={
              handleFilter({
                input: this.input,
                aside,
                dispatch,
              })
            }
            placeholder="검색 또는 신규 추가"
          />
        </div>
        <ul>
          {_.map(filtered || aside[currentType], i => <Item key={i.id} data={i} />)}
        </ul>
      </aside>
    );
  }
}

export default connect(mapStateToProps)(Aside);
