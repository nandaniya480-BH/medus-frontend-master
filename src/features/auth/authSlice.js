import { createSlice } from '@reduxjs/toolkit';
import { login, register } from './authAction';

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null;
const role = localStorage.getItem('role') ? localStorage.getItem('role') : null;

const initialState = {
  loading: false,
  userToken,
  role,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken');
      localStorage.removeItem('role');
      state.loading = false;
      state.user = null;
      state.userToken = null;
      state.role = null;
      state.error = null;
    },
    setAuthSliceError: (state) => {
      state.error = false;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userToken = payload.data.access_token;
      state.role = payload.data.user.role;
    },
    [login.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [register.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [register.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userToken = payload.data.access_token;
      state.role = payload.data.user.role;
      state.success = true;
    },
    [register.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { logout, setAuthSliceError } = authSlice.actions;
export default authSlice;
