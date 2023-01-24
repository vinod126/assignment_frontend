import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
  name: "alert",
  initialState: {
    value: {
      message: "Welcome!!",
      variant: "success",
    },
  },
  reducers: {
    setAlert: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setAlert } = alertSlice.actions;
export default alertSlice.reducer;
