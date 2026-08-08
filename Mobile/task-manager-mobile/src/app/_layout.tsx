import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen name="login" options={{ title: "Login" }} />

      <Stack.Screen name="signup" options={{ title: "Create Account" }} />
      <Stack.Screen name="edit-task" options={{ title: "Edit Task" }} />
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="tasks" />
      <Stack.Screen name="create-task" />
    </Stack>
  );
}
