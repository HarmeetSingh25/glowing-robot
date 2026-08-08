import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/store/authSlice.js";
import taskReducer from "../features/task/store/task.slice.js";
import aiReducer from "../features/task/store/aiSlice.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        task: taskReducer,
        ai: aiReducer
    },
});