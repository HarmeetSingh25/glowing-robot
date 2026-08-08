import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as aiService from "../services/ai.service";

const initialState = {
    suggestion: "",
    loading: false,
    error: null,
};

export const generateSuggestion = createAsyncThunk(
    "ai/generateSuggestion",
    async (data, thunkAPI) => {
        try {
            const response = await aiService.generateSuggestion(data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to generate suggestion"
            );
        }
    }
);

const aiSlice = createSlice({
    name: "ai",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(generateSuggestion.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(generateSuggestion.fulfilled, (state, action) => {
                state.loading = false;
                state.suggestion = action.payload.suggestion;
            })
            .addCase(generateSuggestion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default aiSlice.reducer;