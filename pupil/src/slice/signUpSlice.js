import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  password: "",
  passwordChk: "",
  email: "",
  phone: "",
  name: "",
  isIdDup: true,
  isValidForm: false,
};

const signUpSlice = createSlice({
  name: "signUpSlice",
  initialState,
  reducers: {
    setId(state, action) {
      state.id = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setPasswordChk(state, action) {
      state.passwordChk = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPhone(state, action) {
      if (state.phone.length === 13) {
        return;
      }
      state.phone = action.payload;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    setIsValidForm(state) {
      if (
        /^[A-Za-z0-9]{4,12}$/.test(state.id) &&
        /^[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{8,20}$/.test(state.password) &&
        state.password == state.passwordChk &&
        /^[A-Za-z0-9]([._%+-]?[A-Za-z0-9])*@[A-Za-z0-9]([.-]?[A-Za-z0-9])*\.[A-Za-z]{2,}$/i.test(
          state.email
        )
      ) {
        state.isValidForm = true;
      } else {
        state.isValidForm = false;
      }
    },
    resetAll(state) {
      state.email = "";
      state.id = "";
      state.name = "";
      state.password = "";
      state.passwordChk = "";
      state.phone = "";
      state.isValidForm = false;
    },
  },
});

export const {
  setId,
  setPassword,
  setPasswordChk,
  setEmail,
  setPhone,
  setIsValidForm,
  setName,
  resetAll,
} = signUpSlice.actions;
export default signUpSlice.reducer;
