import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/loginService";

const userLocalStorage = window.localStorage.getItem("loggedBlogappUser");
const initialUser = userLocalStorage ? JSON.parse(userLocalStorage) : null;
if (initialUser) {
    loginService.setUserToken(initialUser.token);
}
const loginSlice = createSlice({
    name: "login",
    initialState: initialUser,
    reducers: {
        setUser: (state, action) => {
            return action.payload;
        },
        clearUser: () => {
            return null;
        },
    },
});

const { setUser, clearUser } = loginSlice.actions;

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
