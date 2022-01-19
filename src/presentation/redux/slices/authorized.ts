import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const authorizedSlice = createSlice({
  name: 'authorized',
  initialState: {
    play_times_exchange: 5,
    play_times_free: 3,
    current_play_type: '', // get value either "exchange" or "free"
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
      state.play_times_free += 1;
    },
    decrementFree: state => {
      if (state.play_times_free > 0) {
        state.play_times_free -= 1;
      }
    },
    setPlayType: (state, action: PayloadAction<string>) => {
      state.current_play_type = action.payload;
    },
  },
});

export const {
  incrementExchange,
  decrementExchange,
  incrementFree,
  decrementFree,
  setPlayType,
} = authorizedSlice.actions;
export default authorizedSlice.reducer;
