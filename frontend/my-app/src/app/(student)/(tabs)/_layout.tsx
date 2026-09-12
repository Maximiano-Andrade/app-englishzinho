import { SafeAreaProvider } from "react-native-safe-area-context";
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <SafeAreaProvider>
            <Tabs>
                <Tabs.Screen name="index" options={{ title: 'Englishzinho' }} />
            </Tabs>
        </SafeAreaProvider>
    );
}
