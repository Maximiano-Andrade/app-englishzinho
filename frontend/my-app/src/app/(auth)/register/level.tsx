import {Text, View, StyleSheet,} from "react-native";
import {Host, Checkbox} from '@expo/ui/jetpack-compose';
import {useState} from "react";
import PrimaryButton from '../../../componets/PrimaryButton'
import {router, useLocalSearchParams} from 'expo-router'

import {cadastrarUsuario} from '../../../services/api';
import {Alert} from 'react-native';

type NivelExperiencia = 'iniciante' | 'intermediario' | 'avancado' | null;

export default function Index() {
    const [nivel, setNivel] = useState<NivelExperiencia>(null);

    const {email, senha, nome, escola} = useLocalSearchParams<{
        email: string;
        senha: string;
        nome: string;
        escola: string;
    }>();

    const finalizarCadastro = async () => {
        if (!nivel) {
            Alert.alert('Atenção', 'Selecione seu nível de inglês.');
            return;
        }

        try {
            await cadastrarUsuario({
                nome,
                email,
                senha,
                tipo_usuario: 'ALUNO',
                foto_perfil: '',
                nivel_ingles: nivel,
                escola,
            });

            Alert.alert('Sucesso', 'Aluno cadastrado com sucesso.');
            router.replace('/(student)/(tabs)');
        } catch (error) {
            Alert.alert(
                'Erro',
                error instanceof Error ? error.message : 'Não foi possível cadastrar.'
            );
        }
    };

    const niveis = [
        {id: 'iniciante', label: 'Iniciante'},
        {id: 'intermediario', label: 'Intermediário'},
        {id: 'avancado', label: 'Avançado'},
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.containerTitle}>Você é </Text>
            <View style={styles.containerMain}>

                {niveis.map((item) => (
                    <View key={item.id} style={styles.cardsChecked}>
                        <Host matchContents>
                            <Checkbox
                                value={nivel === item.id}
                                onCheckedChange={(checked) => setNivel(checked ? item.id as NivelExperiencia : null)}
                                colors={{checkedColor: '#2563EB', checkmarkColor: '#FFF'}}
                            />
                        </Host>
                        <Text style={styles.VeiwTitle}>{item.label}</Text>
                    </View>
                ))}

                <PrimaryButton
                    onPress={finalizarCadastro}
                    title="Finalizar"
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

    containerTitle: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Inter_500Medium',
        color: '#374151',
        marginBottom: 20,
    },

    cardsChecked: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#757575',
        borderRadius: 5
    },

    VeiwTitle: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 20,
        color: '#374151',
    }

});