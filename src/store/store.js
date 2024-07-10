import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import signUpReducer from "../slice/signUpSlice";
import seatReducer from "../slice/seatSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    signUp: signUpReducer,
    seat: seatReducer,
  },
});
