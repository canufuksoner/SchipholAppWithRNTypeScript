import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAirlinesApi } from '../Cruds/airlinesCruds';

// havayolları listesi işlemi için asenkron action
export const fetchAirlines = createAsyncThunk(
  'airlines/fetchAirlines',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAirlinesApi();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
