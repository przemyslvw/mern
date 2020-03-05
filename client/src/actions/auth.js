import { USER_LOGIN, USER_ERROR, USER_CREATE, USER_LOADED } from "./constans";
import axios from "axios";

export const loadUser = () => async dispatch => {
  try {
    const response = await axios.get("http://localhost:5000/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: response.data
    });
  } catch (error) {
    dispatch({ type: USER_ERROR, payload: error });
  }
};

export const login = (password, email) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify({ password, email });
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      body,
      config
    );
    dispatch({
      type: USER_LOGIN,
      payload: response.data
    });
    dispatch(loadUser());
  } catch (error) {
    dispatch({ type: USER_ERROR, payload: error });
  }
};

export const registerUser = (username, password, email) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify({ username, password, email });
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      body,
      config
    );
    dispatch({
      type: USER_CREATE,
      payload: response.data
    });
    dispatch(loadUser());
  } catch (error) {
    dispatch({ type: USER_ERROR, payload: error });
  }
};