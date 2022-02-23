import { createSlice } from "@reduxjs/toolkit";
const initialmatState = { list: [] };

const matSlice = createSlice({
  name: "mat",
  initialState: initialmatState,
  reducers: {
    MATSET(state, action) {
      state.list = action.payload;
    },
  },
});

export const matActions = matSlice.actions;

export default matSlice.reducer;
