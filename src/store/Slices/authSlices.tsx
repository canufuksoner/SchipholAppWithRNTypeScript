import { createSlice } from '@reduxjs/toolkit';
import { login } from '../Actions/authActions';

import {setError} from './statusSlices';

interface AuthState {
  token: string | null;
  tokenExpireDate: string | null; // Date yerine string
  refreshToken: string | null;
  refreshTokenExpireDate: string | null; // Date yerine string
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: 'xyz',
  tokenExpireDate: null,
  refreshToken: null,
  refreshTokenExpireDate: null,
  loading: false,
  error: null,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.tokenExpireDate = null;
      state.refreshToken = null;
      state.refreshTokenExpireDate = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.tokenExpireDate = action.payload.tokenExpireDate; // Zaten string
        state.refreshToken = action.payload.refreshToken;
        state.refreshTokenExpireDate = action.payload.refreshTokenExpireDate; // Zaten string
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        setError(action.payload as string);
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
