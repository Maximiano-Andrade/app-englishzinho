import { Stack } from "expo-router";
import {
  useFonts,
  Inter_800ExtraBold,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_300Light,
    Inter_200ExtraLight,
} from '@expo-google-fonts/inter';
import { SafeAreaProvider } from 'react-native-safe-area-context'
export default function Layout() {
  const [loaded] = useFonts({
    Inter_800ExtraBold,
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_500Medium,
    Inter_300Light,
    Inter_200ExtraLight,
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
