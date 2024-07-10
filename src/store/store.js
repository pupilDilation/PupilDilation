import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../slice/loginSlice";
import signUpReducer from "../slice/signUpSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    signUp: signUpReducer,
  },
});
