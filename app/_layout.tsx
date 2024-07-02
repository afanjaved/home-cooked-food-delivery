import { Stack } from "expo-router";
import { AuthProvider } from "./Ctx"
export default function RootLayout() {
  return (
    <AuthProvider>
    <Stack>
      <Stack.Screen name="home" />
    </Stack>
    </AuthProvider>
  );
}
