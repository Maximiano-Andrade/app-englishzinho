import { Text, View, StyleSheet, TextInput } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import SegudaryButton from "../../componets/SegudaryButton";
import { router, Link } from "expo-router";

export default function Login() {

  const insets = useSafeAreaInsets();

  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.containerView}>
        <View style={[styles.titleContainer, { paddingTop: insets.top }]}>
          <Text style={styles.title}>Englishzinho</Text>
          <Text style={styles.subtitle}>Bem-vindo</Text>
        </View>
        <View style={styles.inputsAndButtonContainer}>
          <View style={styles.inputsAndTitleContianer}>
            <View style={styles.titleContainer_2}>
              <Text style={styles.subtitle_2}>Login com sua conta</Text>
            </View>

            <View style={styles.inputsView}>
              <View style={styles.inputView}>
                <AntDesign name="mail" size={24} color="black" />
                <TextInput style={styles.input} placeholder="email" autoFocus={true} />
              </View>
              <View style={styles.inputView}>
                <AntDesign name="lock" size={24} color="black" />
                <TextInput style={styles.input} placeholder="senha" />
              </View>
            </View>

          </View>
          <SegudaryButton onPress={() => router.push('/(student)/(tabs)')} />
        </View>
      </View>

      <View style={styles.footerView}>
        <Text style={styles.footerText}>Não tem uma conta? <Link href='/register' style={styles.footerTextLink}>Registre-se</Link></Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 15,
    gap: 20,
  },

  containerView: {
    width: '100%',
  },

  titleContainer: {
    alignItems: 'center',
    gap: 30,
    width: '100%',
  },

  title: {
    fontFamily: 'Inter_800ExtraBold',
    color: '#2563EB',
    fontSize: 47,
  },

  subtitle: {
    fontSize: 47,
    fontFamily: 'Inter_800ExtraBold',
    color: '#374151',
  },

  inputsAndButtonContainer: {
    gap: 20,
  },

  inputsAndTitleContianer: {
    gap: 20,
  },

  titleContainer_2: {
    alignItems: 'center',
  },

  subtitle_2: {
    fontSize: 20,
    fontFamily: 'Inter_500Medium',
    color: '#374151',
  },

  inputsView: {
    gap: 15,
  },

  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  input: {
    flex: 1,
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
  },

  footerView: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  footerText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 20,
    color: '#374151',
  },

  footerTextLink: {
    fontFamily: 'Inter_500Medium',
    fontSize: 20,
    color: '#2563EB',
  },

});