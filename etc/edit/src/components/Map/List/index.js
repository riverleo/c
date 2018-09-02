import _ from 'lodash';
import cn from 'classnames';
import axios from 'axios';
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
import handleClick from './handleClick';
import handleKeyUp from './handleKeyUp';
import handleChange from './handleChange';
import PropertyEditor from './PropertyEditor';

const mapStateToProps = state => ({
  list: state.map.list,
});

class List extends Component {
  static propTypes = {
    list: shape({
      maps: arrayOf(shape({
        id: string.isRequired,
        name: string.isRequired,
      })),
      selected: string,
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

    axios.get('/maps').then(({ data: maps }) => dispatch(set({ maps })));
  }

  render() {
    const {
      list,
      dispatch,
    } = this.props;
    const {
      maps,
      selected: selectedId,
      filtered: filteredIds,
    } = list;

    const selected = _.find(maps, m => m.id === selectedId);

    let filtered;

    if (!_.isNil(filteredIds)) {
      filtered = _.filter(maps, m => _.includes(filteredIds, m.id));
    }

    return (
      <div className={cn(className, { selected })}>
        <div className="list">
          <input
            ref={this.input}
            type="text"
            onKeyUp={
              handleKeyUp({
                list,
                input: this.input,
                dispatch,
              })
            }
            onChange={
              handleChange({
                list,
                input: this.input,
                dispatch,
              })
            }
            placeholder="검색 또는 신규추가"
          />
          <ul>
            {
              _.map(filtered || maps, map => (
                <li key={map.id}>
                  <button
                    type="button"
                    onClick={
                      handleClick({
                        map,
                        dispatch,
                      })
                    }
                  >
                    <dl>
                      <dt>
                        {map.name || '-'}
                      </dt>
                      <dd>
                        {map.id}
                      </dd>
                    </dl>
                  </button>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="selected">
          {selected && <PropertyEditor map={selected} />}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(List);
