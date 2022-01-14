import {createSlice} from '@reduxjs/toolkit';

const authorizedSlice = createSlice({
  name: 'authorized',
  initialState: {
    play_time: 10,
  },
  reducers: {
    incremented: state => {
      state.play_time += 1;
    },
    decremented: state => {
      if (state.play_time > 0) {
        state.play_time -= 1;
      }
    },
  },
});

export const {incremented, decremented} = authorizedSlice.actions;
export default authorizedSlice.reducer;
