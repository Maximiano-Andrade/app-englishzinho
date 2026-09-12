import { Stack } from "expo-router";
import {
  useFonts,
  Inter_800ExtraBold
} from '@expo-google-fonts/inter';
import { SafeAreaProvider } from 'react-native-safe-area-context'


export default function Layout() {
  const [loaded] = useFonts({
    Inter_800ExtraBold,
  });

  // Aguarda carregar a fonte antes de renderizar
  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
      </Stack>
    </SafeAreaProvider>
  );
}
