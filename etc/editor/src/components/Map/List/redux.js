const SET = 'MAP_LIST_SET';

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
