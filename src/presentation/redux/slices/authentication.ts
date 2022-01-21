import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    confirm: null,
  },
  reducers: {
    saveConfirm: (state, action: PayloadAction<any>) => {
      state.confirm = action.payload;
    },
  },
});

export const {saveConfirm} = authenticationSlice.actions;
export default authenticationSlice.reducer;
