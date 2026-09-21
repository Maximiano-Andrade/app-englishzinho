import {View, Text, StyleSheet, TextInput} from 'react-native'
import PrimaryButton from '../../../componets/PrimaryButton'
import {useLocalSearchParams, useRouter} from 'expo-router';
import {useState} from "react";
import { Alert } from 'react-native';
import { cadastrarUsuario } from '../../../services/api';

export default function School() {
    const router = useRouter();
    const params = useLocalSearchParams();

    const {email, senha, tipoUsuario, nome} = useLocalSearchParams<{
        email: string;
        senha: string;
        tipoUsuario: 'aluno' | 'professor';
        nome: string;
    }>();

    const [escola, setEscola] = useState('');

    // Verifica se o parâmetro 'isTeacher' é igual a 'true'
    const isTeacher = params.isTeacher === 'true';

    const handleNext = async () => {
        if (!escola.trim()) {
            Alert.alert('Atenção', 'Digite o nome da escola.');
            return;
        }

        if (tipoUsuario === 'professor') {
            try {
                await cadastrarUsuario({
                    nome,
                    email,
                    senha,
                    tipo_usuario: 'PROFESSOR',
                    foto_perfil: 'https://thumbor.novaescola.org.br/o-6mJpSYSuM0pdy3Xx9P-5WE784=/assets.novaescola.org.br/KKukVeEBNB6qAB87Qe7dPCrvwAVPZrnGQcEKbC8QPXkx2Q7AnSvkNSwThhmT/blog-questao-de-ensino-que-tipo-de-formacao-ajuda-de-fato-o-professor-a-resolver-os-dilemas-da-sala-de-aula-shutterstock.jpeg',
                    escola,
                });

                Alert.alert('Sucesso', 'Professor cadastrado com sucesso.');
                router.replace('/(teacher)/(tabs)');
            } catch (error) {
                Alert.alert(
                    'Erro',
                    error instanceof Error ? error.message : 'Não foi possível cadastrar.'
                );
            }

            return;
        }

        router.push({
            pathname: '/(auth)/register/level',
            params: {
                email,
                senha,
                nome,
                escola,
            },
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerMain}>
                <View>
                    <View style={{marginBottom: 20}}>
                        <Text style={styles.ViewTitle}>Escola</Text>
                    </View>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Digite o nome da sua escola"
                        value={escola}
                        onChangeText={setEscola}
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