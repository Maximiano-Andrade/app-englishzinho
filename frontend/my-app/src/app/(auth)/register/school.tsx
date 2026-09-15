import {View, Text, StyleSheet, TextInput} from 'react-native'
import PrimaryButton from '../../../componets/PrimaryButton'
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function School() {
    const router = useRouter();
    const params = useLocalSearchParams();

    // Verifica se o parâmetro 'isTeacher' é igual a 'true'
    const isTeacher = params.isTeacher === 'true';

    const handleNext = () => {
        if (isTeacher) {
            // Se for professor, vai para o menu principal do professor
            router.push('/(teacher)/(tabs)'); // Ajuste esta rota para a rota do seu menu de professor
        } else {
            // Se for aluno, continua o fluxo normal de registro
            router.push('/(auth)/register/level');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerMain}>
                <View>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.ViewTitle}>Escola</Text>
                    </View>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Digite o nome da sua escola"
                    />
                </View>

                <PrimaryButton
                    onPress={handleNext}
                    title={isTeacher ? 'Finalizar' : 'Próximo'}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#fff",
            padding: 15,
            alignItems: "center",
        },

        containerMain: {
            width: "100%",
            gap: 20
        },

        ViewTitle: {
            fontFamily: 'Inter_500Medium',
            fontSize: 20,
            color: '#374151',
            textAlign: "center"
        },

        TextInput:{
            borderColor: "#374151",
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 20,
            paddingLeft: 10,
            fontFamily: 'Inter_500Medium',
        }
    }
)