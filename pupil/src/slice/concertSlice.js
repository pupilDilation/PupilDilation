import { createSlice } from "@reduxjs/toolkit";

const concertSlice = createSlice({
  name: "concert",
  initialState: { selectedConcertId: null },
  reducers: {
    selectedConcert: (state, action) => {
      state.selectedConcertId = action.payload;
    },
  },
});

export const { selectedConcert } = concertSlice.actions;
export default concertSlice.reducer;
