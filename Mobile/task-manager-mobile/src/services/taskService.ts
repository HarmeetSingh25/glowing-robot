import api from "./api";

export const getTasks = async () => {
  const response = await api.get("/tasks");
  console.log(response , "data");
   return response.data;
};

export const getTask = async (taskId: string) => {
  const response = await api.get(`/tasks/${taskId}`);
  return response.data;
};

export const createTask = async (taskData: any) => {
  const response = await api.post("/tasks", taskData);
  return response.data;
};

export const updateTask = async (
  taskId: string,
  taskData: any
) => {
  const response = await api.put(`/tasks/${taskId}`, taskData);
  return response.data;
};

export const deleteTask = async (taskId: string) => {
  const response = await api.delete(`/tasks/${taskId}`);
  return response.data;
};