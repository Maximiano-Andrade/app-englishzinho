import { Stack } from "expo-router";

import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function Layout() {
    return (
        <SafeAreaProvider>
            <Stack>
                <Stack.Screen name="login" options={{ headerShown: false }} />
                <Stack.Screen name="register" options={{ headerShown: true, headerTitle: "Registro" }} />
            </Stack>
        </SafeAreaProvider>
    );
}