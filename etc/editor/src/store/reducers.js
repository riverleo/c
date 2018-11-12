import { combineReducers } from 'redux';
import mapList from '../components/Map/List/redux';
import mapEditor from '../components/Map/Editor/redux';
import mapEditorAside from '../components/Map/Editor/Aside/redux';

export default {
  map: combineReducers({
    list: mapList,
    editor: combineReducers({
      app: mapEditor,
      aside: mapEditorAside,
    }),
  }),
};
