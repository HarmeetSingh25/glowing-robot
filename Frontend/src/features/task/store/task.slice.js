import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as taskService from "../services/task.services";

const initialState = {
    tasks: [],
    task: null,
    loading: false,
    error: null,
};

// ===================== GET ALL TASKS =====================

export const getTasks = createAsyncThunk(
    "task/getTasks",
    async (_, thunkAPI) => {
        try {
            const response = await taskService.getTasks();
            // console.log(response);
            
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch tasks"
            );
        }
    }
);

// ===================== GET SINGLE TASK =====================

export const getTask = createAsyncThunk(
    "task/getTask",
    async (id, thunkAPI) => {
        try {
            const response = await taskService.getTask(id);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch task"
            );
        }
    }
);

// ===================== CREATE TASK =====================

export const createTask = createAsyncThunk(
    "task/createTask",
    async (taskData, thunkAPI) => {
        try {
            const response = await taskService.createTask(taskData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to create task"
            );
        }
    }
);

// ===================== UPDATE TASK =====================

export const updateTask = createAsyncThunk(
    "task/updateTask",
    async ({ id, data }, thunkAPI) => {
        try {
            const response = await taskService.updateTask(id, data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to update task"
            );
        }
    }
);

// ===================== DELETE TASK =====================

export const deleteTask = createAsyncThunk(
    "task/deleteTask",
    async (id, thunkAPI) => {
        try {
            await taskService.deleteTask(id);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to delete task"
            );
        }
    }
);

// ===================== SLICE =====================

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder

            // ================= GET TASKS =================

            .addCase(getTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload.tasks;
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ================= GET TASK =================

            .addCase(getTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTask.fulfilled, (state, action) => {
                state.loading = false;
                state.task = action.payload.task;
            })
            .addCase(getTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ================= CREATE TASK =================

            .addCase(createTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.push(action.payload.task);
            })
            .addCase(createTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ================= UPDATE TASK =================

            .addCase(updateTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.loading = false;

                state.tasks = state.tasks.map((task) =>
                    task._id === action.payload.task._id
                        ? action.payload.task
                        : task
                );

                state.task = action.payload.task;
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ================= DELETE TASK =================

            .addCase(deleteTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.loading = false;

                state.tasks = state.tasks.filter(
                    (task) => task._id !== action.payload
                );
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default taskSlice.reducer;