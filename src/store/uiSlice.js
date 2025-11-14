import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    toggleIsOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { setIsOpen, toggleIsOpen } = uiSlice.actions;
export default uiSlice.reducer;
