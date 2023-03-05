import axios from "axios";
import { setAlert } from "./alert";
// import { returnErrors } from "./messages";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "./types";

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };

    const res = await axios.get("/api/auth", config);

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request Body
    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post("/api/users", body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

// Login User
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request Body
    const body = JSON.stringify({ email, password });
    console.log(body);
    try {
      const res = await axios.post("/api/auth", body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

// // Check token & load user
// export const loadUser = () => (dispatch, getState) => {
//   const token = getState().auth.token;
//   // Headers
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   // If token, add to headers config
//   if (token) {
//     config.headers["Authorization"] = `Token ${token}`;
//   }

//   axios
//     .get("/api/auth/user", config)
//     .then((res) => {
//       dispatch({
//         type: USER_LOADED,
//         payload: res.data,
//       });
//     })
//     .catch((err) => {
//       dispatch(returnErrors(err.response.data, err.response.status));
//       dispatch({
//         type: AUTH_ERROR,
//       });
//     });
// };

// // Setup config/headers and token
// export const tokenConfig = (getState) => {
//   const token = getState().auth.token;
//   // Headers
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   // If token, add to headers config
//   if (token) {
//     config.headers["Authorization"] = `Token ${token}`;
//   }

//   return config;
// };
