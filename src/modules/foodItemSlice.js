import { createSlice } from "@reduxjs/toolkit";

export const foodItemSlice = createSlice({
  name: "foodItems",
  initialState: {
    value: [],
    pageNumber: 1,
    totalItems: 0,
  },
  reducers: {
    setFoodData: (state, action) => {
      state.value = action.payload;
    },
    setTotalItems: (state, action) => {
      state.totalItems = action.payload;
    },
  },
});
export const { setFoodData, setTotalItems } = foodItemSlice.actions;
export default foodItemSlice.reducer;
