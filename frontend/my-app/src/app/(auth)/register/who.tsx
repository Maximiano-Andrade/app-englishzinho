import {View, Text, StyleSheet, TextInput} from 'react-native'
import PrimaryButton from '../../../componets/PrimaryButton'
import {useRouter, useLocalSearchParams} from 'expo-router'
import {useState} from "react";
import { Alert } from 'react-native';

export default function Who() {
    const router = useRouter();
    const params = useLocalSearchParams();

    const {email, senha, tipoUsuario} = useLocalSearchParams<{
        email: string;
        senha: string;
        tipoUsuario: 'aluno' | 'professor';
    }>();

    const handleNext = () => {
        if (!nome.trim()) {
            Alert.alert('Atenção', 'Digite seu nome.');
            return;
        }

        router.push({
            pathname: '/(auth)/register/school',
            params: {
                email,
                senha,
                tipoUsuario,
                nome,
            },
        });
    };

    const [nome, setNome] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.containerMain}>
                <View>
                    <View style={{marginBottom: 20}}>
                        <Text style={styles.ViewTitle}>Quem é você</Text>
                    </View>

                    <TextInput style={styles.TextInput} placeholder="Digiter seu nome" value={nome}
                               onChangeText={setNome}/>
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