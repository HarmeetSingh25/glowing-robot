import api from "../../../shared/api/axios.js";

export const createTask = (data) =>
    api.post("/tasks", data);

export const getTasks = (id) =>
    
    api.get("/tasks");
    
    export const getTask = (id) =>
        console.log(id);
    // api.get(`/tasks/${id}`);

export const updateTask = (id, data) =>
    api.put(`/tasks/${id}`, data);

export const deleteTask = (id) =>
    api.delete(`/tasks/${id}`);