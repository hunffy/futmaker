import { createStore } from "redux";

const initialState = {
  users: [],
  userInfo: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "LOGIN_USER":
      return {
        ...state,
        userInfo: action.payload,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        userInfo: null,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
