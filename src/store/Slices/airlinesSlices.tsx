import { createSlice } from '@reduxjs/toolkit';
import { fetchAirlines } from '../Actions/airlinesActions';

import {setError} from './statusSlices';
import Airline from '../../models/airline';

interface AirlinesState {
    airlines: Airline[];
    loading: boolean;
    error: string | null | undefined;
}

const initialState: AirlinesState = {
    airlines: [],
    loading: false,
    error: null,
};

const airlinesSlice = createSlice({
    name: 'airlines',
    initialState,
    reducers: {
        // İsteğe bağlı olarak ek reducer
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAirlines.pending, (state) => {
                state.loading = true;
                state.error = undefined; // Önceki hatayı sıfırla
            })
            .addCase(fetchAirlines.fulfilled, (state, action) => {
                state.loading = false;
                state.airlines = action.payload; // API'den gelen veriyi state'e ekle
            })
            .addCase(fetchAirlines.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Hata durumunu state'e ekle

                setError(action.error.message ?? null);
            });
    },
});

// Slice'tan reducer ve action'ları dışa aktar
export const { actions, reducer } = airlinesSlice;
export default reducer;
