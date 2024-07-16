import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../slice/loginSlice";
import signUpReducer from "../slice/signUpSlice";
import seatReducer from "../slice/seatSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    signUp: signUpReducer,
    seat: seatReducer,
  },
});
