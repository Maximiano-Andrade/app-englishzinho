import { StyleSheet, Text, View} from 'react-native';
import PrimaryButton from '../componets/PrimaryButton';
import { useRouter } from 'expo-router';


import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.containerView}>
        <Text style={styles.title} adjustsFontSizeToFit>Englishzinho</Text>
        <PrimaryButton onPress={() => router.push('/login')} />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 15,
    display: 'flex',
  },

  containerView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 80,
    height: '100%',
    width: '100%',

  },

  title: {
    fontSize: 47,
    fontFamily: 'Inter_800ExtraBold',
    color: '#2563EB',
    marginBottom: 180,
  },


});