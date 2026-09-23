import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {router, useFocusEffect} from 'expo-router';
import {useCallback, useState} from 'react';

import TreeButton from '../../../componets/TreeButton';
import {
    listarAtividades,
    listarProgressoDoAluno,
} from '../../../services/api';

type AtividadeType = {
    id: number;
    title: string;
    description: string;
    type: string;
    level: string;
    created_at: string;
};

type ProgressoType = {
    id: number;
    aluno_id: number;
    atividade_id: number;
    status: 'Pendente' | 'Concluída';
    completed_at: string | null;
};

type UsuarioSalvo = {
    id_aluno: number | null;
};

export default function Home() {
    const [atividades, setAtividades] = useState<AtividadeType[]>([]);
    const [progressos, setProgressos] = useState<ProgressoType[]>([]);
    const [carregando, setCarregando] = useState(true);

    const carregarDados = useCallback(async () => {
        try {
            setCarregando(true);

            const usuarioSalvo = await AsyncStorage.getItem('@usuario');

            if (!usuarioSalvo) {
                setAtividades([]);
                setProgressos([]);
                return;
            }

            const usuario: UsuarioSalvo = JSON.parse(usuarioSalvo);

            if (!usuario.id_aluno) {
                setAtividades([]);
                setProgressos([]);
                return;
            }

            const [dadosAtividades, dadosProgressos] = await Promise.all([
                listarAtividades(),
                listarProgressoDoAluno(usuario.id_aluno),
            ]);

            setAtividades(dadosAtividades);
            setProgressos(dadosProgressos);
        } catch (error) {
            console.log('Erro ao buscar dados:', error);
        } finally {
            setCarregando(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            carregarDados();
        }, [carregarDados]),
    );

    function iconePorTipo(tipo: string) {
        if (tipo === 'Quiz') return 'bars';
        if (tipo === 'Fala') return 'audio';
        return 'customer-service';
    }

    function atividadeFoiConcluida(atividadeId: number) {
        return progressos.some(
            (progresso) =>
                progresso.atividade_id === atividadeId &&
                progresso.status === 'Concluída',
        );
    }

    const atividadesConcluidas = atividades.filter((atividade) =>
        atividadeFoiConcluida(atividade.id),
    );

    const totalQuiz = atividadesConcluidas.filter(
        (atividade) => atividade.type === 'Quiz',
    ).length;

    const totalEscuta = atividadesConcluidas.filter(
        (atividade) => atividade.type === 'Escuta',
    ).length;

    const totalFala = atividadesConcluidas.filter(
        (atividade) => atividade.type === 'Fala',
    ).length;

    const atividadesPendentes = atividades.filter(
        (atividade) => !atividadeFoiConcluida(atividade.id),
    );

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.containerMain}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.mainCard1}>
                    <Text style={styles.cardTitle}>Exercícios feitos</Text>

                    <View style={styles.cardsIn}>
                        <View style={styles.cards}>
                            <View style={styles.cardLabel}>
                                <AntDesign name="bars" size={24} color="#F97316"/>
                                <Text style={styles.cardText}>Quiz</Text>
                            </View>

                            <Text style={styles.cardNumber}>{totalQuiz}</Text>
                        </View>

                        <View style={styles.cards}>
                            <View style={styles.cardLabel}>
                                <AntDesign
                                    name="customer-service"
                                    size={24}
                                    color="#F97316"
                                />
                                <Text style={styles.cardText}>Escuta</Text>
                            </View>

                            <Text style={styles.cardNumber}>{totalEscuta}</Text>
                        </View>

                        <View style={styles.cards}>
                            <View style={styles.cardLabel}>
                                <AntDesign name="audio" size={24} color="#F97316"/>
                                <Text style={styles.cardText}>Fala</Text>
                            </View>

                            <Text style={styles.cardNumber}>{totalFala}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.sugestoes}>
                    <Text style={styles.sugestoesTitle}>Sugerido para você</Text>

                    <View style={styles.mainCard2}>
                        {carregando ? (
                            <ActivityIndicator size="large" color="#2563EB"/>
                        ) : atividadesPendentes.length === 0 ? (
                            <Text style={styles.card2Description}>
                                Nenhuma atividade disponível.
                            </Text>
                        ) : (
                            atividadesPendentes.map((atividade) => {

                                return (
                                    <View
                                        key={atividade.id}
                                        style={styles.card2}
                                    >
                                        <View style={styles.activityHeader}>
                                            <AntDesign
                                                style={styles.cardIcon}
                                                name={iconePorTipo(atividade.type)}
                                                size={24}
                                                color="#F97316"
                                            />

                                            <View style={styles.activityTexts}>
                                                <Text style={styles.card2Title}>
                                                    {atividade.title}
                                                </Text>

                                                <Text style={styles.card2SubTitle}>
                                                    {atividade.type} • {atividade.level}
                                                </Text>
                                            </View>
                                        </View>

                                        <Text style={styles.card2Description}>
                                            {atividade.description}
                                        </Text>

                                        <View style={styles.activityFooter}>
                                            <Text style={styles.dateText}>
                                                {new Date(
                                                    atividade.created_at,
                                                ).toLocaleDateString('pt-BR')}
                                            </Text>


                                                <TreeButton
                                                    onPress={() =>
                                                        router.push({
                                                            pathname:
                                                                '/(student)/atividade',
                                                            params: {
                                                                atividadeId: String(
                                                                    atividade.id,
                                                                ),
                                                            },
                                                        })
                                                    }
                                                />

                                        </View>
                                    </View>
                                );
                            })
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    containerMain: {
        gap: 10,
        paddingBottom: 25,
    },
    mainCard1: {
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#9CA3AF',
        gap: 10,
    },
    cardTitle: {
        fontSize: 25,
        fontFamily: 'Inter_800ExtraBold',
        color: '#374151',
    },
    cardsIn: {
        flexDirection: 'row',
        gap: 5,
    },
    cards: {
        padding: 5,
        flex: 1,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#9CA3AF',
    },
    cardLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    cardText: {
        color: '#374151',
        fontFamily: 'Inter_500Medium',
        fontSize: 16,
    },
    cardNumber: {
        fontSize: 25,
        fontFamily: 'Inter_300Light',
        color: '#F97316',
    },
    sugestoes: {
        gap: 5,
    },
    sugestoesTitle: {
        color: '#374151',
        fontFamily: 'Inter_600SemiBold',
        fontSize: 15,
    },
    mainCard2: {
        gap: 5,
    },
    card2: {
        gap: 10,
        borderWidth: 1,
        borderColor: '#9CA3AF',
        borderRadius: 5,
        padding: 10,
    },
    activityHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    activityTexts: {
        flex: 1,
        gap: 3,
    },
    cardIcon: {
        borderWidth: 2,
        padding: 5,
        borderRadius: 5,
        borderColor: '#F97316',
    },
    card2Title: {
        fontSize: 15,
        fontFamily: 'Inter_400Regular',
        color: '#374151',
    },
    card2SubTitle: {
        fontSize: 11,
        fontFamily: 'Inter_600SemiBold',
        color: '#6B7280',
    },
    card2Description: {
        fontSize: 15,
        fontFamily: 'Inter_300Light',
        color: '#374151',
    },
    activityFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateText: {
        color: '#374151',
        fontFamily: 'Inter_500Medium',
    },
    concluidaButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 5,
        backgroundColor: '#22C55E',
    },
    concluidaText: {
        color: '#fff',
        fontFamily: 'Inter_600SemiBold',
        fontSize: 12,
    },
});