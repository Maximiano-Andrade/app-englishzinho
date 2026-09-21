import { Stack } from 'expo-router';

export default function RegisterLayout() {
    return (
        <Stack screenOptions={{ headerShown: true, headerTitle: '' }}>
            <Stack.Screen name="user"   />
            <Stack.Screen name="who"    />
            <Stack.Screen name="school"    />
            <Stack.Screen name="level"   />
        </Stack>
    );
}