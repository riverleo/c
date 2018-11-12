const SET = 'MAP_EDITOR_SET';

// ==========================================
// Actions
// ==========================================

export const set = payload => ({
  type: SET,
  payload,
});

// ==========================================
// Reducer
// ==========================================

const initialState = {
  size: 30,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
