import api from "./api";
import * as SecureStore from "expo-secure-store";

export const loginUser = async (
  email: string,
  password: string
) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  const { token } = response.data;
  console.log(token ,"token")
  

  if (token) {
    await SecureStore.setItemAsync("token", token);
  }

  return response.data;
};