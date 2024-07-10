import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSeats: [],
};

const seatsSlice = createSlice({
  name: "seat",
  initialState,
  reducers: {
    toggleSeat: (state, action) => {
      const seatNumber = action.payload;
      if (state.selectedSeats.includes(seatNumber)) {
        state.selectedSeats = state.selectedSeats.filter(
          (seat) => seat !== seatNumber
        );
      } else {
        state.selectedSeats.push(seatNumber);
      }
    },
  },
});

export const { toggleSeat } = seatsSlice.actions;
export default seatsSlice.reducer;
