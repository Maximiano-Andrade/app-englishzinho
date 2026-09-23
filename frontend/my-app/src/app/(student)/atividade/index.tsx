import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Alert,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import {Checkbox, Host} from '@expo/ui/jetpack-compose';

import {router, useLocalSearchParams} from 'expo-router';
import {buscarAtividade, concluirProgresso} from '../../../services/api';

export type Answer = {
    id: number;
    text: string;
    correct: boolean;
};

export type Question = {
    id: number;
    text: string;
    answers: Answer[];
};

export type ActivityData = {
    title: string;
    description: string;
    type: string;
    level: string;
    questions: Question[];
};


/** Tela que o aluno usa para responder a atividade criada pelo professor. */
export default function QuizAluno() {


    const {atividadeId} = useLocalSearchParams<{
        atividadeId: string;
    }>();

    const [activity, setActivity] = useState<ActivityData | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [selectedAnswers, setSelectedAnswers] = useState<
        Record<number, number | undefined>
    >({});
    const [index, setIndex] = useState(0);
    const [alunoId, setAlunoId] = useState<number | null>(null);

    useEffect(() => {
        async function carregarAluno() {
            const usuarioSalvo = await AsyncStorage.getItem('@usuario');

            if (usuarioSalvo) {
                const usuario = JSON.parse(usuarioSalvo);
                setAlunoId(usuario.id_aluno);
            }
        }

        carregarAluno();
    }, []);

    useEffect(() => {
        async function carregarAtividade() {
            try {
                const dados = await buscarAtividade(Number(atividadeId));
                setActivity(dados);
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível carregar a atividade.');
            } finally {
                setCarregando(false);
            }
        }

        carregarAtividade();
    }, [atividadeId]);

    if (carregando) {
        return <ActivityIndicator size="large" color="#2563EB"/>;
    }

    if (!activity) {
        return (
            <View style={styles.screen}>
                <Text style={styles.empty}>Atividade não encontrada.</Text>
            </View>
        );
    }

    const questions = activity.questions;
    const question = questions[index];

    const isLastQuestion = index === questions.length - 1;

    const progress = questions.length
        ? ((index + 1) / questions.length) * 100
        : 0;

    const currentSelection = question
        ? selectedAnswers[question.id]
        : undefined;

    async function finishQuiz() {
        const atividadeAtual = activity;


        if (!atividadeAtual) {
            Alert.alert('Erro', 'Atividade não encontrada.');
            return;
        }

        if (!alunoId) {
            Alert.alert(
                'Erro',
                'Aluno não identificado. Faça login novamente.',
            );
            return;
        }

        try {
            await concluirProgresso(alunoId, Number(atividadeId));

            const correctAnswers = activity.questions.reduce(
                (total, question) => {
                    const answerId = selectedAnswers[question.id];

                    const answer = question.answers.find(
                        (item) => item.id === answerId,
                    );

                    return total + (answer?.correct ? 1 : 0);
                },
                0,
            );

            Alert.alert(
                'Atividade concluída!',
                `Você acertou ${correctAnswers} de ${activity.questions.length} questões.`,
                [
                    {
                        text: 'OK',
                        onPress: () =>
                            router.replace('/(student)/(tabs)/progress'),
                    },
                ],
            );
        } catch (error) {
            console.log('Erro ao concluir progresso:', error);

            Alert.alert(
                'Erro ao concluir',
                error instanceof Error
                    ? error.message
                    : 'Não foi possível concluir a atividade.',
            );
        }
    }

    async function goForward() {
        if (!currentSelection) {
            Alert.alert(
                'Escolha uma alternativa',
                'Selecione uma resposta antes de continuar.',
            );
            return;
        }

        if (isLastQuestion) {
            await finishQuiz();
            return;
        }

        setIndex((value) => value + 1);
    }

    if (!question) {
        return (
            <View style={styles.screen}>
                <Text style={styles.empty}>
                    Esta atividade ainda não possui questões.
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <View style={{gap: 20}}>
                {/*cards title*/}
                <View style={styles.activityCard}>
                    <View style={styles.activityTitleRow}>
                        <AntDesign style={styles.activityIcon} name="bars" size={24} color="#2563EB"/>
                        <Text style={styles.activityTitle}>{activity.title}</Text>
                    </View>
                    <View style={{gap: 10}}>
                        <Text style={styles.description}>{activity.description}</Text>
                        <View style={styles.tags}>
                            <Tag label={activity.type}/>
                            <Tag label={`${activity.level}`}/>
                        </View>
                    </View>
                </View>

                {/*Card de progress de questão*/}
                <View style={styles.progressCard}>
                    <View style={styles.progressLabels}>
                        <Text style={styles.progressTitle}>Questões {index + 1} de {questions.length}</Text>
                        <Text style={styles.progressValue}>{Math.round(progress)}%</Text>
                    </View>
                    <View style={styles.progressTrack}>
                        <View style={[styles.progressFill, {width: `${progress}%`}]}/>
                    </View>
                </View>

                {/*Card de questão*/}
                <View style={styles.questionCard}>
                    <Text style={styles.questionText}>{question.text}</Text>
                    <View style={{gap: 10}}>
                        {
                            question.answers.map((answer) => {
                                const isSelected = currentSelection === answer.id;
                                return (
                                    <View key={answer.id} style={styles.opcoesCard}>
                                        <Host matchContents>
                                            <Checkbox
                                                value={isSelected}
                                                onCheckedChange={(checked) =>
                                                    setSelectedAnswers((previous) => ({
                                                        ...previous,
                                                        [question.id]: checked ? answer.id : undefined,
                                                    }))
                                                }
                                                colors={{
                                                    checkedColor: '#2563EB',
                                                    checkmarkColor: '#fbfbfb',
                                                }}
                                            />
                                        </Host>
                                        <Text style={styles.VeiwTitle}>{answer.text}</Text>
                                    </View>
                                );
                            })
                        }
                    </View>
                </View>

                {/*Card botão*/}
                <View style={styles.actions}>
                    <Pressable
                        accessibilityRole="button"
                        disabled={index === 0}
                        style={[styles.previousButton, index === 0 && styles.buttonHidden]}
                        onPress={() => setIndex((value) => Math.max(0, value - 1))}
                    >
                        <Feather name="arrow-left" size={24} color="#374151"/>
                        <Text style={styles.previousButtonText}> Voltar</Text>
                    </Pressable>

                    <Pressable
                        accessibilityRole="button"
                        style={styles.nextButton}
                        onPress={goForward}
                    >
                        <Text style={styles.nextButtonText}>{isLastQuestion ? 'Complete' : 'Próximo'}</Text>
                        <Feather name="arrow-right" size={24} color="#fff"/>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

function Tag({label}: { label: string }) {
    return (
        <View style={styles.tag}>
            <Text style={styles.tagText}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    activityCard: {
        padding: 10,
        backgroundColor: '#EEF3FF',
        gap: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#BFDBFE'

    },
    activityTitleRow: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
    activityIcon: {
        backgroundColor: '#FFF',
        padding: 5,
        borderRadius: 5,
        // iOS
        shadowColor: 'rgb(0 0 0 / 0.17)',
        shadowOffset: {width: 1, height: 0},
        shadowOpacity: 0.15,
        shadowRadius: 4,

        // Android
        elevation: 4,

    },
    activityTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 15,
        color: '#374151'
    },
    description: {
        fontSize: 15,
        fontFamily: 'Inter_300Light',
        color: '#374151'
    },
    tags: {
        flexDirection: "row",
        gap: 15
    },
    tag: {

        padding: 5,
        borderWidth: 1,
        borderColor: '#374151',
        borderRadius: 5,
    },
    tagText: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 10,

    },
    progressCard: {
        backgroundColor: '#ffffff',
        padding: 10,
        gap: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'rgb(156 163 175 / 0.31)',

        shadowColor: 'rgb(0 0 0 / 0.13)',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.13,
        shadowRadius: 1,

        // Android
        elevation: 1,

    },
    progressLabels: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    progressTitle: {
        fontFamily: 'Inter_500Medium',
        fontSize: 13,
        color: '#374151',
    },
    progressValue: {
        fontSize: 13,
        fontFamily: 'Inter_700Bold',
        color: '#2563EB',
    },
    progressTrack: {
        height: 10,
        borderRadius: 6,
        backgroundColor: '#AAB4C2',
        overflow: 'hidden'
    },
    progressFill: {
        backgroundColor: '#2563EB',
        height: '100%',
    },
    questionCard: {
        padding: 10,
        backgroundColor: '#F3F4F6',
        gap: 15,

        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'rgb(156 163 175 / 0.31)',

        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.13,
        shadowRadius: 4,
        elevation: 2, // Android
    },
    questionText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 13,
        color: '#374151'
    },
    opcoesCard: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 6,
        borderColor: 'rgb(156 163 175 / 0.6)',
    },
    VeiwTitle: {
        color: '#475569',
        fontSize: 17,
        fontFamily: 'Inter_600SemiBold',
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    previousButton: {
        paddingHorizontal: 16,
        paddingVertical: 11,
        backgroundColor: '#EEF3FF',
        borderColor: '#9CA3AF',
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    nextButton: {
        paddingHorizontal: 16,
        paddingVertical: 11,
        backgroundColor: '#2563EB',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    nextButtonText: {
        fontFamily: 'Inter_600SemiBold',
        color: 'white',
        fontSize: 13
    },
    previousButtonText: {
        fontFamily: 'Inter_600SemiBold',
        color: '#374151',
        fontSize: 13
    },
    buttonHidden: {
        opacity: 0,
    },
    empty: {
        padding: 15,
        textAlign: 'center',
    }
})