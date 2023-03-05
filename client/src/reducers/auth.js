import { REGISTER_SUCCESS, REGISTER_FAIL } from "../actions/types";

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
      case REGISTER_SUCCESS:
        console.log("REGISTER_SUCCESS");
        localStorage.setItem("token", payload.token);
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false,
        };
      case REGISTER_FAIL:
        console.log("REGISTER_FAIL");
        localStorage.removeItem("token");
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
        };
      default:
        console.log(state);
        return state;
    }
  } catch (err) {
    console.log(err);
  }
}

export default authReducer;
