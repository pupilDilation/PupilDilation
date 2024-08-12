import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pw: "",
  pwChk: "",
};

const changePwSlice = createSlice({
  name: "changePwSlice",
  initialState,
  reducers: {
    setPw(state, action) {
      state.pw = action.payload;
    },
    setPwChk(state, action) {
      state.pwChk = action.payload;
    },
  },
});

export const { setPw, setPwChk } = changePwSlice.actions;

export default changePwSlice.reducer;
