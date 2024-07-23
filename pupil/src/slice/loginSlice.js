import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  id: "",
  password: "",
  userType: "",
  isValidForm: false,
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    setId(state, action) {
      state.id = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setIsValidForm(state) {
      if (
        /^[A-Za-z0-9]{4,12}$/.test(state.id) &&
        /^[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{8,20}$/.test(state.password)
      ) {
        state.isValidForm = true;
      } else {
        state.isValidForm = false;
      }
    },
    setUserType(state, action) {
      state.userType = action.payload;
    },

    loginSuccess: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const {
  loginSuccess,
  logout,
  setUserType,
  setId,
  setPassword,
  setIsValidForm,
} = loginSlice.actions;
export default loginSlice.reducer;
