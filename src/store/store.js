import {configureStore} from "@reduxjs/toolkit";
import authReducer from '../slice/auth/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});