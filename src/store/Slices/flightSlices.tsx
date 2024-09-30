import {createSlice} from '@reduxjs/toolkit';
import {
  fetchFlights,
  fetchFlightById,
  fetchDestinations,
  selectSeat,
} from '../Actions/flightActions';

import {setError} from './statusSlices';
import {Flight} from '../../models/flight';
import {Destination} from '../../models/destination';

interface FlightsState {
  flights: any[];
  flight: Flight | null; // Tekil uçuş verisi
  destinations: Destination[];
  selectedSeat: null;
  loading: boolean;
  error: string | undefined;
}

const initialState: FlightsState = {
  flights: [],
  flight: null, // Başlangıçta uçuş bilgisi yok
  destinations: [],
  selectedSeat: null,
  loading: false,
  error: undefined,
};

const flightsSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    // İsteğe bağlı olarak ek reducer
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFlights.pending, state => {
        state.loading = true;
        state.error = undefined; // Önceki hatayı sıfırla
      })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.loading = false;
        state.flights = action.payload.flights; // API'den gelen veriyi state'e ekle
      })
      .addCase(fetchFlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Hata durumunu state'e ekle

        setError(action.error.message ?? null);
      })
      .addCase(fetchFlightById.pending, state => {
        state.loading = true; // Yükleme başladığında
        state.error = undefined; // Önceki hatayı sıfırla
      })
      .addCase(fetchFlightById.fulfilled, (state, action) => {
        state.loading = false; // Yükleme tamamlandı
        state.flight = action.payload; // API'den gelen tekil uçuş verisini state'e ekle
      })
      .addCase(fetchFlightById.rejected, (state, action) => {
        state.loading = false; // Yükleme tamamlandı
        state.error = action.error.message; // Hata durumunu state'e ekle

        setError(action.error.message ?? null);
      })
      .addCase(fetchDestinations.pending, state => {
        state.loading = true;
        state.error = undefined; // Önceki hatayı sıfırla
      })
      .addCase(fetchDestinations.fulfilled, (state, action) => {
        state.loading = false;
        state.destinations = action.payload.destinations; // API'den gelen veriyi state'e ekle
      })
      .addCase(fetchDestinations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Hata durumunu state'e ekle

        setError(action.error.message ?? null);
      })
      .addCase(selectSeat.pending, state => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(selectSeat.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedSeat = action.payload.seat;
      })
      .addCase(selectSeat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;

        setError(action.error.message ?? null);
      });
  },
});

// Slice'tan reducer ve action'ları dışa aktar
export const {actions, reducer} = flightsSlice;
export default reducer;
