import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
};

const modalUiSlice = createSlice({
  name: "modalui",
  initialState,
  reducers: {
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    toggleIsModalOpen: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
  },
});

export const { setIsModalOpen, toggleIsModalOpen } = modalUiSlice.actions;
export default modalUiSlice.reducer;
