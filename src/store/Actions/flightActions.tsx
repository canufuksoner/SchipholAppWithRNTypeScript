import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  fetchFlightsApi,
  fetchFlightByIdApi,
  fetchDestinationsApi,
  postSeatSelectionApi,
} from '../Cruds/flightCruds';


// uçuş listesi işlemi için asenkron action
export const fetchFlights = createAsyncThunk(
  'flights/fetchFlights',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchFlightsApi();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const fetchFlightById = createAsyncThunk(
  'flights/fetchFlightById',
  async (id: string) => {
    try {
      const data = await fetchFlightByIdApi(id);
      return data; // API'den gelen veriyi döndür
    } catch (error: any) {
      throw new Error(error.message); // Hata durumunda hatayı fırlat
    }
  },
);

// API isteğini gerçekleştiren asenkron bir thunk oluşturun
export const fetchDestinations = createAsyncThunk(
  'destinations/fetchDestinations',
  async () => {
    try {
      const data = await fetchDestinationsApi(); // API'den veriyi al
      return data; // API'den gelen veriyi döndür
    } catch (error: any) {
      throw new Error(error.message); // Hata durumunda hatayı fırlat
    }
  },
);

// Koltuk seçme action'ı
export const selectSeat = createAsyncThunk(
  'flights/selectSeat',
  async (
    {flightId, seat}: {flightId: string; seat: string},
    {rejectWithValue},
  ) => {
    try {
      const response = await postSeatSelectionApi(flightId, seat); // API'yi çağırıyoruz
      return response; // Başarılı olursa dönen veriyi döndür
    } catch (error: any) {
      throw new Error(error.message); // Hata durumunda hatayı fırlat
    }
  },
);
