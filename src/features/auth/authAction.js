import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseApiUrl = process.env.REACT_APP_BACKEND_ENDPOINT_API || '';
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '12'
        },
        body: JSON.stringify({ email, password }),
      };
      const { data } = await axios.post(
        `${baseApiUrl}login`,
        { email, password },
        config
      );
      localStorage.setItem('userToken', data?.data?.access_token);
      localStorage.setItem('role', data?.data?.user?.role);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (
    { role, name, first_name, last_name, email, password, confirm_password },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '12'
        },
      };
      const { data } = await axios.post(
        `${baseApiUrl}register`,
        {
          role,
          name,
          first_name,
          last_name,
          email,
          password,
          confirm_password,
        },
        config
      );
      localStorage.setItem('userToken', data?.data?.access_token);
      localStorage.setItem('role', data?.data?.user?.role);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
