import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    userId: null,
    token: null,
    user : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.userId = action.payload.userId;
            state.token = action.payload.token;
            localStorage.setItem('rentroToken', JSON.stringify(action.payload.token));
            localStorage.setItem('rentroUserId', JSON.stringify(action.payload.user.id));
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.userId = null;
            state.token = null;
            localStorage.removeItem('rentroToken');
            localStorage.removeItem('rentroUserId');
        },
        checkLoginStatus: (state) => {
            const token = JSON.parse(localStorage.getItem('rentroToken'));
            const userId = JSON.parse(localStorage.getItem('rentroUserId'));
            if (token && userId) {
                state.isLoggedIn = true;
                state.token = token;
                state.userId = userId;
            } else {
                state.isLoggedIn = false;
                state.token = null;
                state.userId = null;
            }
        },
        setUser : (state, action) => {
            state.user = action.payload;
        }
    },
});

export const { login, logout, checkLoginStatus, setUser } = authSlice.actions;

export const selectLoggedIn = (state) => state.authSlice.isLoggedIn;
export const selectUserId = (state) => state.authSlice.userId;
export const selectToken = (state) => state.authSlice.token;
export const selectUser = (state) =>  state.authSlice.user;

export default authSlice.reducer;
