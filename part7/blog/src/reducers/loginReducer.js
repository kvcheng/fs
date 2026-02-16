import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/loginService";

const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    setUser: (state, action) => {
        return action.payload;
    },
    clearUser: () => {
        return null;
    }
  },
});

const { setUser, clearUser } = loginSlice.actions;

export const initialiseUsers = () => {
  return async (dispatch) => {
    const user = window.localStorage.getItem("loggedBlogappUser");
    if (user) {
        loginService.setUserToken(JSON.parse(user).token);
      dispatch(setUser(JSON.parse(user)));
    }
  };
};

export const loginUser = (user) => {
  return async (dispatch) => {
    const res = await loginService.login(user);
    dispatch(setUser(res));
    return res;
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    loginService.logout();
    dispatch(clearUser());
    window.localStorage.removeItem("loggedBlogappUser");
  };
};

export default loginSlice.reducer;
