import { createStore } from 'redux';

const initialState = {
  userData: [],
};

export const setUserData = (data) => ({
  type: 'SET_USER_DATA',
  payload: data,
});

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        userData: action.payload,
      };

    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;
