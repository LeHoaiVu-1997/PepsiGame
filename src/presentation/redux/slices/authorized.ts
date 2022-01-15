import {createSlice} from '@reduxjs/toolkit';

const authorizedSlice = createSlice({
  name: 'authorized',
  initialState: {
    play_times_exchange: 5,
    paly_times_free: 3,
  },
  reducers: {
    incrementExchange: state => {
      state.play_times_exchange += 1;
    },
    decrementExchange: state => {
      if (state.play_times_exchange > 0) {
        state.play_times_exchange -= 1;
      }
    },
    incrementFree: state => {
      state.paly_times_free += 1;
    },
    decrementFree: state => {
      if (state.play_times_exchange > 0) {
        state.paly_times_free -= 1;
      }
    },
  },
});

export const {
  incrementExchange,
  decrementExchange,
  incrementFree,
  decrementFree,
} = authorizedSlice.actions;
export default authorizedSlice.reducer;
