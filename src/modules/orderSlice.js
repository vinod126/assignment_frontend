import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "orderItems",
  initialState: {
    cart: {},
    historyOrders: [],
    inProgressOrders: [],
  },
  reducers: {
    addItem: (state, action) => {
      const [id, name, cost] = action.payload;
      const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const day = weekday[new Date().getDay()];
      if (state.cart.hasOwnProperty(id)) {
        state.cart[id].quantity += 1;
      } else {
        state.cart[id] = {
          id,
          name,
          cost,
          quantity: 1,
          day,
        };
      }
    },
    removeItem: (state, action) => {
      const [id] = action.payload;
      if (state.cart.hasOwnProperty(id)) {
        state.cart[id].quantity -= 1;
        if (state.cart[id].quantity <= 0) {
          delete state.cart[id];
        }
      }
    },
    resetCart: (state) => {
      state.cart = {};
    },
    setHistory: (state, action) => {
      state.historyOrders = action.payload;
    },
    setInProgress: (state, action) => {
      state.inProgressOrders = action.payload;
    },
  },
});
export const { addItem, removeItem, resetCart, setHistory, setInProgress } =
  orderSlice.actions;
export default orderSlice.reducer;
