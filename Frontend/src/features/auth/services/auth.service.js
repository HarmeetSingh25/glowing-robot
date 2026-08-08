import api from "../../../shared/api/axios.js";

export const register = (data) =>
    
    api.post("/auth/register", data);
    
    export const login = (data) =>
        // console.log(data , "data");
    api.post("/auth/login", data);

export const getMe = () =>
    api.get("/auth/me");

export const logout = () =>
    api.post("/auth/logout");