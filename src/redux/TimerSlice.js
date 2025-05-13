// src/features/timer/timerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const TimerSlice = createSlice({
  name: 'timer',
  initialState: {
    value: 0,
  },
  reducers: {
    setTimer: (state, action) => {
      state.value = action.payload;
    },
    increment: (state) => {
      state.value += 1;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

export const { setTimer, increment, reset } = TimerSlice.actions;

export default TimerSlice.reducer;
