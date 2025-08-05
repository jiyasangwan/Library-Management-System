import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import popupReducer from "./slices/popUpSlice";
import bookReducer from "./slices/bookSlice";
import borrowReducer from "./slices/borrowSlice";
import userReducer from "./slices/userSlice";

export const store=configureStore({
    reducer:{
        auth:authReducer,
        popup:popupReducer,
        book:bookReducer,
        borrow:borrowReducer,
        user:userReducer,
    },
});


