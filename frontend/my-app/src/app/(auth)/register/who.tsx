import {View, Text, StyleSheet, TextInput} from 'react-native'
import PrimaryButton from '../../../componets/PrimaryButton'
import { useRouter, useLocalSearchParams} from 'expo-router'

export default function Who() {
    const router = useRouter();
    const params = useLocalSearchParams();

    const handleNext = () => {
        router.push({
            pathname: '/(auth)/register/school',
            params: {isTeacher: params.isTeacher} // Repassa o valor recebido
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerMain}>
                <View>
                    <View style={{marginBottom: 20}}>
                        <Text style={styles.ViewTitle}>Quem é você</Text>
                    </View>

                    <TextInput style={styles.TextInput} placeholder="Digiter seu nome"/>
                </View>


                <PrimaryButton onPress={handleNext} title={'Proximo'}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create(
    {
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

        TextInput: {
            borderColor: "#374151",
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 20,
            paddingLeft: 10,
            fontFamily: 'Inter_500Medium',
        }
    }
)