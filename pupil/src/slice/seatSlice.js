import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  row: 0,
  col: 0,
  selectedSeats: [],
};

const seatsSlice = createSlice({
  name: "seat",
  initialState,
  reducers: {
    setRow: (state, action) => {
      const row = action.payload;
      state.row = row;
    },
    setCol: (state, action) => {
      const col = action.payload;
      state.col = col;
    },
    toggleSeat: (state, action) => {
      const seatNumber = action.payload; //좌석 번호 추출
      /* 선택된 좌석 목록에서 해당 좌석이 포함되었는지 판단 -> 선택, 선택 해제 */
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

export const { toggleSeat, setCol, setRow } = seatsSlice.actions;
export default seatsSlice.reducer;
