import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as authService from "../services/auth.service.js";

const initialState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
};

export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
        try {
            const response = await authService.register(userData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Registration Failed"
            );
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
        try {
            const response = await authService.login(userData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Login Failed"
            );
        }
    }
);

export const getCurrentUser = createAsyncThunk(
    "auth/me",
    async (_, thunkAPI) => {
        try {
            const response = await authService.getMe();
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Unauthorized"
            );
        }
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            await authService.logout();
            return true;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Logout Failed"
            );
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getCurrentUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                // console.log(state.user)
                
                state.isAuthenticated = true;
                // console.log(state.isAuthenticated)
                
            })
            .addCase(getCurrentUser.rejected, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
            })

            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});


export default authSlice.reducer;