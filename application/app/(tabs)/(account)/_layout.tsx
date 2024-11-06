import { Stack } from "expo-router";

export default function AccountLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="accountInfo"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="orders"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
