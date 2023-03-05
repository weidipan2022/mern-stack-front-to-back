import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
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
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: payload,
        };
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
        console.log("Register success or login success");
        localStorage.setItem("token", payload.token);
        console.log("payload", payload);
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false,
        };
      case AUTH_ERROR:
      case REGISTER_FAIL:
      case LOGIN_FAIL:
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
