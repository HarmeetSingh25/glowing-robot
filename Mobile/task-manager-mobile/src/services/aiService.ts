import api from "./api";

export const getTaskSuggestion = async (
  title: string,
  description: string
) => {
  const response = await api.post("/ai/suggest", {
    title,
    description,
  });

  return response.data;
};