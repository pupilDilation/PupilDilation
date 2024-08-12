import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slice/loginSlice";
import signUpReducer from "./slice/signUpSlice";
import seatReducer from "./slice/seatSlice";
import concertReducer from "./slice/concertSlice";

/**
 * @author: 248Kobe
 * @description: 상태 관리 필요한 모든 reducer 모음집 (로그인 상태, 회원가입 상태, selected 좌석 상태)
 */
export const store = configureStore({
  reducer: {
    login: loginReducer,
    signUp: signUpReducer,
    seat: seatReducer,
    concert: concertReducer,
  },
});
