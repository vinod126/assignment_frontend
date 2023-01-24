import { createSlice } from "@reduxjs/toolkit";

export const menuItemSlice = createSlice({
  name: "menu",
  initialState: {
    menuItems: {},
  },
  reducers: {
    setMenuItems: (state, action) => {
      state.menuItems = action.payload;
    },
    updateMenuItem: (state, action) => {
      state.menuItems = {
        ...state.menuItems,
        [action.payload.id]: action.payload,
      };
    },
  },
});
export const { updateMenuItem, setMenuItems } = menuItemSlice.actions;
export default menuItemSlice.reducer;
