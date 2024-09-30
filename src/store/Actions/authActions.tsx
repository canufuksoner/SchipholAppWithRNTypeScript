import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi } from '../Cruds/authCruds';

// login işlemi için asenkron action
export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await loginApi(username, password);
      return {
        token: response.token,
        tokenExpireDate: response.tokenExpireDate.toISOString(), // String olarak döndür
        refreshToken: response.refreshToken,
        refreshTokenExpireDate: response.refreshTokenExpireDate.toISOString(), // String olarak döndür
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
