import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StatusState {
    error: string | null;
}

const initialState: StatusState = {
    error: null,
};


const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
    },
});

// Dışa aktar
export const { setError } = statusSlice.actions;
export default statusSlice.reducer;
