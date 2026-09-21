import {Text, View, StyleSheet,} from "react-native";
import {Host, Checkbox} from '@expo/ui/jetpack-compose';
import {useState} from "react";
import PrimaryButton from '../../../componets/PrimaryButton'
import {useRouter, useLocalSearchParams} from 'expo-router'
import { Alert } from 'react-native';

type TipoUsuario = 'aluno' | 'professor' | null;

export default function User() {
    const router = useRouter();
    const [tipoUsuario, setTipoUsuario] = useState<TipoUsuario>(null);

    const {email, senha} = useLocalSearchParams<{
        email: string;
        senha: string;
    }>();

    const opcoes = [
        {id: 'aluno', label: 'Aluno'},
        {id: 'professor', label: 'Professor'},
    ];

    const handleNext = () => {
        if (!tipoUsuario) {
            Alert('Selecione Aluno ou Professor.');
            return;
        }
        router.push({
            pathname: '/(auth)/register/who',
            params: {
                email,
                senha,
                tipoUsuario,
            }
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.containerTitle}>Você é </Text>
            <View style={styles.containerMain}>

                {opcoes.map((opcao) => (
                    <View key={opcao.id} style={styles.cardsChecked}>
                        <Host matchContents>
                            <Checkbox
                                value={tipoUsuario === opcao.id}
                                onCheckedChange={(checked) => setTipoUsuario(checked ? opcao.id as TipoUsuario : null)}
                                colors={{checkedColor: '#2563EB', checkmarkColor: '#FFF'}}
                            />
                        </Host>
                        <Text style={styles.VeiwTitle}>{opcao.label}</Text>
                    </View>
                ))}

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
