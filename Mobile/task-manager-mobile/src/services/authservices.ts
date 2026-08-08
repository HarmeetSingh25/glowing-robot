import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loginUser = async (
  email: string,
  password: string
) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  const { token } = response.data;

  if (token) {
    await AsyncStorage.setItem("token", token);
  }

  return response.data;
};