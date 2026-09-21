import {Text, View, StyleSheet, TextInput,} from "react-native";
import {useState} from "react";
import PrimaryButton from '../../../componets/PrimaryButton'
import {router} from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Alert } from 'react-native';


export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleNext = () => {
        if (email == '' || password == '') {
            Alert('Please enter a valid email');
            return;
        }
        router.push({
            pathname: '/(auth)/register/user',
            params: {
                email,
                senha: password,
            },

        });
    };


    return (
        <View style={styles.container}>
            <View style={styles.containerMain}>
                <View style={{alignItems: 'center',}}>
                    <Text style={styles.title}>Englishzinho</Text>
                    <Text style={styles.subtitle}>Cadastrar</Text>
                </View>

                <View style={styles.inputsView}>

                    <View style={styles.inputView}>
                        <MaterialIcons name="email" size={24} color="#374151"/>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Digite seu e-mail"
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <MaterialIcons name="password" size={24} color="#374151"/>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Crie sua senha"
                            onChangeText={setPassword}
                        />
                    </View>

                </View>

                <PrimaryButton
                    onPress={handleNext}
                    title="Próximo"
                />

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
    },
    containerMain: {
        gap: 20
    },

    mainTitle: {},

    title: {
        fontFamily: 'Inter_800ExtraBold',
        fontSize: 47,
        color: "#2563EB"
    },
    subtitle: {
        fontFamily: 'Inter_500Medium',
        fontSize: 20,
        color: '#374151'
    },
    inputsView: {
        gap: 15
    },
    inputView: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#9CA3AF',
        borderRadius: 5,
        gap: 10,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    textInput: {
        fontSize: 20,
        fontFamily: 'Inter_600SemiBold',
        color: '#374151'
    }
});
