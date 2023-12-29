import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/userSlice";
import { alertSlice } from "./features/alertSlice";

export default configureStore({
    reducer: {
        alerts:alertSlice.reducer,
        user: userSlice.reducer
    }
})