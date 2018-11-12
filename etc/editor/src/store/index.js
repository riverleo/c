import {
  compose,
  createStore,
  combineReducers,
} from 'redux';
import rootReducer from './reducers';

let devtools = __ => __;
let reduxStore = null;

/* eslint-disable no-undef, no-underscore-dangle */
if (process.browser && window.__REDUX_DEVTOOLS_EXTENSION__) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__();
}
/* eslint-eanble no-undef, no-underscore-dangle */

const create = (initialState = {}) => createStore(
  combineReducers({
    ...rootReducer,
  }),
  initialState,
  compose(devtools),
);

export default (initialState) => {
  if (!reduxStore) {
    reduxStore = create(initialState);
  }

  return reduxStore;
};
