import axios from "axios";
import { setAlert } from "./alert";
// import { returnErrors } from "./messages";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";

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
