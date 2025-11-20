import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import uiReducer from "./uiSlice";
import modalReducer from "./modalSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer,
    modalUi: modalReducer,
  },
});
