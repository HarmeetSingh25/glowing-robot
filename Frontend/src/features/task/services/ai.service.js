import api from "../../../shared/api/axios";

export const generateSuggestion = (data) =>
    api.post("/ai/suggest", data);