import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const authorizedSlice = createSlice({
  name: 'authorized',
  initialState: {
    play_times_exchange: 0,
    play_times_free: 0,
    current_play_type: '', // get value either "exchange" or "free"
    name: '',
    phone_number: '',
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
    saveUser: (state, action: PayloadAction<any>) => {
      console.log('action: ', action.payload);

      state.name = action.payload[0]['name'];
      state.phone_number = action.payload[0]['phone_number'];
      state.play_times_exchange = action.payload[0]['play_time_exchange'];
      state.play_times_free = action.payload[0]['play_time_free'];
    },
  },
});

export const {
  incrementExchange,
  decrementExchange,
  incrementFree,
  decrementFree,
  setPlayType,
  saveUser,
} = authorizedSlice.actions;
export default authorizedSlice.reducer;
