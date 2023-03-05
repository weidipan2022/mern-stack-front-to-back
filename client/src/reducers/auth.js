import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;
  try {
    switch (type) {
      case USER_LOADED:
        console.log("USER_LOADED");
        localStorage.setItem("token", payload.token);
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: payload,
        };
      case REGISTER_SUCCESS:
        console.log("REGISTER_SUCCESS");
        localStorage.setItem("token", payload.token);
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false,
        };
      case AUTH_ERROR:
      case REGISTER_FAIL:
        console.log("Auth error or register fail");
        localStorage.removeItem("token");
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
        };

      default:
        return state;
    }
  } catch (err) {
    console.log(err);
  }
}

export default authReducer;
