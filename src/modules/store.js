import { configureStore } from "@reduxjs/toolkit";
import foodItems from "./foodItemSlice";
import pagination from "./paginationSlice";
import orderItems from "./orderSlice";
import menu from "./menuSlice";
import alert from "./alertSlice";

export default configureStore({
  reducer: {
    foodItems,
    pagination,
    orderItems,
    menu,
    alert,
  },
});
