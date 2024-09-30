import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlices';
import flightReducer from './Slices/flightSlices';
import statusReducer from './Slices/statusSlices';
import airlinesReducer from './Slices/airlinesSlices';
import authMiddleware from './authMiddleware';

const store = configureStore({
  reducer: {
    auth: authReducer,
    flights: flightReducer,
    status: statusReducer,
    airlines: airlinesReducer
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
