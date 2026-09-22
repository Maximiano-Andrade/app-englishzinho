import {View, Text, StyleSheet, ScrollView} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import {router, useFocusEffect} from 'expo-router'
import QuartoButton from "../../../componets/QuartoButton";
import {useCallback, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    listarAtividades,
    listarProgressoDoAluno,
} from '../../../services/api';

type AtividadeType = {
    id: number;
    title: string;
    description: string;
    type: 'Quiz' | 'Escuta' | 'Fala';
    level: string;
    created_at: string;
};

type ProgressoType = {
    id: number;
    aluno_id: number;
    atividade_id: number;
    status: 'Pendente' | 'Concluída';
};

type UsuarioSalvo = {
    id_usuario: number;
    id_aluno: number | null;
};

export default function Progress() {

    const [atividades, setAtividades] = useState<AtividadeType[]>([]);
    const [progressos, setProgressos] = useState<ProgressoType[]>([]);

    const carregarDados = useCallback(async () => {
        try {
            const usuarioSalvo = await AsyncStorage.getItem('@usuario');

            if (!usuarioSalvo) {
                return;
            }

            const usuario: UsuarioSalvo = JSON.parse(usuarioSalvo);

            if (!usuario.id_aluno) {
                return;
            }

            const [atividadesData, progressosData] = await Promise.all([
                listarAtividades(),
                listarProgressoDoAluno(usuario.id_aluno),
            ]);

            setAtividades(atividadesData);
            setProgressos(progressosData);
        } catch (error) {
            console.log('Erro ao buscar atividades:', error);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            carregarDados();
        }, [carregarDados]),
    );

    return (
        <View style={styles.container}>
            <View style={{gap: 5}}>
                <View>
                    <Text style={styles.headerTitle}>Minha Atividades</Text>
                </View>
                <ScrollView contentContainerStyle={styles.cardAtividades} showsVerticalScrollIndicator={false}>
                    {atividades.map((atividade) => {
                        const progresso = progressos.find(
                            (item) => item.atividade_id === atividade.id,
                        );

                        const status = progresso?.status || 'Pendente';

                        const icon =
                            atividade.type === 'Quiz'
                                ? 'bars'
                                : atividade.type === 'Fala'
                                    ? 'audio'
                                    : 'sound';

                        return (
                            <View key={atividade.id} style={styles.cardAtividade}>
                                <View style={styles.cardAtividadeIconTitleType}>
                                    <View style={styles.cardAtividadeIcon}>
                                        <AntDesign
                                            name={icon}
                                            size={24}
                                            color="#F97316"
                                        />
                                    </View>

                                    <View style={{gap: 5, flex: 1}}>
                                        <Text style={styles.cardAtividadeTitle}>
                                            {atividade.title}
                                        </Text>

                                        <Text style={styles.cardAtividadeSubtitle}>
                                            {atividade.type} • {atividade.level}
                                        </Text>
                                    </View>
                                </View>

                                <Text style={styles.cardAtividadeDescription}>
                                    {atividade.description}
                                </Text>

                                <View style={styles.cardAtividadeDateStatus}>
                                    <Text style={styles.cardAtividadeDate}>
                                        {new Date(atividade.created_at).toLocaleDateString('pt-BR')}
                                    </Text>

                                    <QuartoButton
                                        onPress={
                                            status === 'Pendente'
                                                ? () =>
                                                    router.push({
                                                        pathname: '/(student)/atividade',
                                                        params: {
                                                            atividadeId: String(atividade.id),
                                                        },
                                                    })
                                                : undefined
                                        }
                                        title={status}
                                        background={
                                            status === 'Pendente'
                                                ? '#EF4444'
                                                : '#22C55E'
                                        }
                                        icon={
                                            status === 'Pendente'
                                                ? 'play-outline'
                                                : 'checkbox'
                                        }
                                    />
                                </View>
                            </View>
                        );
                    })}
                </ScrollView>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    headerTitle: {
        fontSize: 15,
        fontFamily: 'Inter_600SemiBold',
        color: '#374151',
    },

    cardAtividades: {
        gap: 10,
        paddingBottom: 25
    },
    cardAtividade: {
        padding: 10,
        borderColor: '#9CA3AF',
        borderRadius: 5,
        borderWidth: 1,
        gap: 10,
    },
    cardAtividadeIconTitleType: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    cardAtividadeIcon: {
        padding: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#F97316'
    },
    cardAtividadeTitle: {
        fontFamily: 'inter_400Regular',
        fontSize: 15,
        color: '#374151',
    },
    cardAtividadeSubtitle: {
        fontFamily: 'inter_600SemiBold',
        fontSize: 12,
    },
    cardAtividadeDescription: {
        fontFamily: 'Inter_300Light',
    },
    cardAtividadeDateStatus: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cardAtividadeDate: {
        fontSize: 15,
        fontFamily: 'Inter_600SemiBold',
        color: '#374151'
    },
})