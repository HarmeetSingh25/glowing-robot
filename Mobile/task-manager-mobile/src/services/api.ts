import axios from "axios";

const api = axios.create({
  baseURL: "https://glowing-robot-jafc.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;