import { configureStore } from "@reduxjs/toolkit";
import incrementReducer from "./slices/incrementSlice";

const store = configureStore({
  reducer: {
    increment: incrementReducer,
  },
});

export default store;
