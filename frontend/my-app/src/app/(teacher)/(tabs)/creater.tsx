import React, {useEffect, useState} from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Checkbox, Host} from '@expo/ui/jetpack-compose';

import {criarAtividade} from '../../../services/api';


type TipoAtividade = 'Quiz' | 'Escuta' | 'Fala';
type NivelAtividade = 'Iniciante' | 'Intermediário' | 'Avançado';

type Answer = {
    id: string;
    text: string;
    correct: boolean;
};

type Question = {
    id: string;
    text: string;
    answers: Answer[];
};

type ActivityData = {
    title: string;
    description: string;
    type: TipoAtividade;
    level: NivelAtividade | '';
    questions: Question[];
};

type UsuarioSalvo = {
    id_usuario: number;
    id_professor: number | null;
    nome: string;
    tipo_usuario: 'ALUNO' | 'PROFESSOR';
};

const opcoesLevel: { id: NivelAtividade; label: NivelAtividade }[] = [
    {id: 'Iniciante', label: 'Iniciante'},
    {id: 'Intermediário', label: 'Intermediário'},
    {id: 'Avançado', label: 'Avançado'},
];

const opcoesType: { id: TipoAtividade; label: TipoAtividade }[] = [
    {id: 'Quiz', label: 'Quiz'},
    {id: 'Escuta', label: 'Escuta'},
    {id: 'Fala', label: 'Fala'},
];


export default function Creater() {
    const [currentStep, setCurrentStep] = useState(1);
    const [professorId, setProfessorId] = useState<number | null>(null);

    const [formData, setFormData] = useState<ActivityData>({
        title: '',
        description: '',
        type: 'Quiz',
        level: '',
        questions: [],
    });

    useEffect(() => {
        async function carregarProfessor() {
            const dados = await AsyncStorage.getItem('@usuario');

            if (!dados) {
                return;
            }

            const usuario: UsuarioSalvo = JSON.parse(dados);

            if (usuario.tipo_usuario === 'PROFESSOR') {
                setProfessorId(usuario.id_professor);
            }
        }

        carregarProfessor();
    }, []);

    function nextStep() {
        setCurrentStep((prev) => Math.min(prev + 1, 3));
    }

    function prevStep() {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    }

    async function salvarAtividade() {
        if (!professorId) {
            Alert.alert(
                'Erro',
                'Não foi possível identificar o professor logado.',
            );
            return;
        }

        if (
            !formData.title.trim() ||
            !formData.description.trim() ||
            !formData.level
        ) {
            Alert.alert('Atenção', 'Preencha todos os campos da atividade.');
            return;
        }

        if (formData.questions.length === 0) {
            Alert.alert('Atenção', 'Adicione pelo menos uma pergunta.');
            return;
        }

        const existePerguntaInvalida = formData.questions.some(
            (question) =>
                !question.text.trim() ||
                question.answers.some((answer) => !answer.text.trim()) ||
                !question.answers.some((answer) => answer.correct),
        );

        if (existePerguntaInvalida) {
            Alert.alert(
                'Atenção',
                'Preencha perguntas e respostas, e marque uma resposta correta.',
            );
            return;
        }

        try {
            await criarAtividade({
                professor_id: professorId,
                title: formData.title.trim(),
                description: formData.description.trim(),
                type: formData.type,
                level: formData.level as NivelAtividade,
                questions: formData.questions.map((question) => ({
                    text: question.text.trim(),
                    answers: question.answers.map((answer) => ({
                        text: answer.text.trim(),
                        correct: answer.correct,
                    })),
                })),
            });

            Alert.alert('Sucesso', 'Atividade criada com sucesso.');

            setFormData({
                title: '',
                description: '',
                type: 'Quiz',
                level: '',
                questions: [],
            });

            setCurrentStep(1);
        } catch (error) {
            Alert.alert(
                'Erro ao salvar',
                error instanceof Error
                    ? error.message
                    : 'Não foi possível criar a atividade.',
            );
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.stepperContainer}>
                <StepIndicator step={1} currentStep={currentStep} label="Informação"/>
                <View style={styles.line}/>
                <StepIndicator step={2} currentStep={currentStep} label="Perguntas"/>
                <View style={styles.line}/>
                <StepIndicator step={3} currentStep={currentStep} label="Resumo"/>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {currentStep === 1 && (
                    <StepBasicInfo
                        formData={formData}
                        setFormData={setFormData}
                        onNext={nextStep}
                    />
                )}

                {currentStep === 2 && (
                    <StepQuestions
                        formData={formData}
                        setFormData={setFormData}
                        onBack={prevStep}
                        onNext={nextStep}
                    />
                )}

                {currentStep === 3 && (
                    <StepPreview
                        formData={formData}
                        onBack={prevStep}
                        onSave={salvarAtividade}
                    />
                )}
            </ScrollView>
        </View>
    );
}


function StepIndicator({
                           step,
                           currentStep,
                           label,
                       }: {
    step: number;
    currentStep: number;
    label: string;
}) {
    const ativo = currentStep === step;
    const concluido = currentStep > step;

    return (
        <View style={styles.stepItem}>
            <View
                style={[
                    styles.badge,
                    ativo && styles.badgeActive,
                    concluido && styles.badgeActive,
                ]}
            >
                <Text style={[styles.badgeText, (ativo || concluido) && styles.badgeTextActive]}>
                    {step}
                </Text>
            </View>

            <Text style={styles.stepLabel}>{label}</Text>
        </View>
    );
}


function StepBasicInfo({
                           formData,
                           setFormData,
                           onNext,
                       }: {
    formData: ActivityData;
    setFormData: React.Dispatch<React.SetStateAction<ActivityData>>;
    onNext: () => void;
}) {
    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>Informações da atividade</Text>

            <Text style={styles.label}>Título *</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex.: Cores em inglês"
                value={formData.title}
                onChangeText={(title) => setFormData({...formData, title})}
            />

            <Text style={styles.label}>Nível *</Text>

            {opcoesLevel.map((opcao) => (
                <View key={opcao.id} style={styles.checkboxRow}>
                    <Host matchContents>
                        <Checkbox
                            value={formData.level === opcao.id}
                            onCheckedChange={(checked) =>
                                setFormData({
                                    ...formData,
                                    level: checked ? opcao.id : '',
                                })
                            }
                            colors={{
                                checkedColor: '#2563EB',
                                checkmarkColor: '#FFFFFF',
                            }}
                        />
                    </Host>

                    <Text style={styles.optionLabel}>{opcao.label}</Text>
                </View>
            ))}

            <Text style={styles.label}>Tipo *</Text>

            {opcoesType.map((opcao) => (
                <View key={opcao.id} style={styles.checkboxRow}>
                    <Host matchContents>
                        <Checkbox
                            value={formData.type === opcao.id}
                            onCheckedChange={(checked) => {
                                if (checked) {
                                    setFormData({
                                        ...formData,
                                        type: opcao.id,
                                    });
                                }
                            }}
                            colors={{
                                checkedColor: '#2563EB',
                                checkmarkColor: '#FFFFFF',
                            }}
                        />
                    </Host>

                    <Text style={styles.optionLabel}>{opcao.label}</Text>
                </View>
            ))}

            <Text style={styles.label}>Descrição *</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                multiline
                placeholder="Descreva a atividade"
                value={formData.description}
                onChangeText={(description) =>
                    setFormData({
                        ...formData,
                        description,
                    })
                }
            />

            <TouchableOpacity style={styles.btnPrimary} onPress={onNext}>
                <Text style={styles.btnText}>Próximo</Text>
            </TouchableOpacity>
        </View>
    );
}


function StepQuestions({
                           formData,
                           setFormData,
                           onBack,
                           onNext,
                       }: {
    formData: ActivityData;
    setFormData: React.Dispatch<React.SetStateAction<ActivityData>>;
    onBack: () => void;
    onNext: () => void;
}) {
    function addQuestion() {
        const baseId = Date.now().toString();

        setFormData({
            ...formData,
            questions: [
                ...formData.questions,
                {
                    id: baseId,
                    text: '',
                    answers: [
                        {id: `${baseId}-1`, text: '', correct: true},
                        {id: `${baseId}-2`, text: '', correct: false},
                        {id: `${baseId}-3`, text: '', correct: false},
                    ],
                },
            ],
        });
    }

    function removeQuestion(questionIndex: number) {
        setFormData({
            ...formData,
            questions: formData.questions.filter(
                (_, index) => index !== questionIndex,
            ),
        });
    }

    function updateQuestion(questionIndex: number, text: string) {
        setFormData({
            ...formData,
            questions: formData.questions.map((question, index) =>
                index === questionIndex ? {...question, text} : question,
            ),
        });
    }

    function addAnswer(questionIndex: number) {
        setFormData({
            ...formData,
            questions: formData.questions.map((question, index) => {
                if (index !== questionIndex) {
                    return question;
                }

                return {
                    ...question,
                    answers: [
                        ...question.answers,
                        {
                            id: Date.now().toString(),
                            text: '',
                            correct: false,
                        },
                    ],
                };
            }),
        });
    }

    function updateAnswer(
        questionIndex: number,
        answerIndex: number,
        text: string,
    ) {
        setFormData({
            ...formData,
            questions: formData.questions.map((question, index) => {
                if (index !== questionIndex) {
                    return question;
                }

                return {
                    ...question,
                    answers: question.answers.map((answer, answerPosition) =>
                        answerPosition === answerIndex
                            ? {...answer, text}
                            : answer,
                    ),
                };
            }),
        });
    }

    function setCorrectAnswer(questionIndex: number, answerIndex: number) {
        setFormData({
            ...formData,
            questions: formData.questions.map((question, index) => {
                if (index !== questionIndex) {
                    return question;
                }

                return {
                    ...question,
                    answers: question.answers.map((answer, answerPosition) => ({
                        ...answer,
                        correct: answerPosition === answerIndex,
                    })),
                };
            }),
        });
    }

    function removeAnswer(questionIndex: number, answerIndex: number) {
        setFormData({
            ...formData,
            questions: formData.questions.map((question, index) => {
                if (index !== questionIndex || question.answers.length <= 2) {
                    return question;
                }

                const answers = question.answers.filter(
                    (_, position) => position !== answerIndex,
                );

                if (!answers.some((answer) => answer.correct)) {
                    answers[0].correct = true;
                }

                return {
                    ...question,
                    answers,
                };
            }),
        });
    }

    return (
        <View style={styles.card}>
            <View style={styles.headerRow}>
                <Text style={styles.cardTitle}>
                    Perguntas ({formData.questions.length})
                </Text>

                <TouchableOpacity style={styles.btnAdd} onPress={addQuestion}>
                    <Text style={styles.btnAddText}>+ Pergunta</Text>
                </TouchableOpacity>
            </View>

            {formData.questions.length === 0 ? (
                <Text style={styles.emptyText}>
                    Nenhuma pergunta adicionada.
                </Text>
            ) : (
                formData.questions.map((question, questionIndex) => (
                    <View key={question.id} style={styles.questionCard}>
                        <View style={styles.questionHeader}>
                            <Text style={styles.questionTitle}>
                                Pergunta {questionIndex + 1}
                            </Text>

                            <TouchableOpacity onPress={() => removeQuestion(questionIndex)}>
                                <Text style={styles.btnRemoveText}>Excluir</Text>
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            style={styles.input}
                            placeholder="Texto da pergunta"
                            value={question.text}
                            onChangeText={(text) => updateQuestion(questionIndex, text)}
                        />

                        <View style={styles.optionHeader}>
                            <Text style={styles.sectionLabel}>Respostas</Text>

                            <TouchableOpacity onPress={() => addAnswer(questionIndex)}>
                                <Text style={styles.btnAddOptionText}>+ Opção</Text>
                            </TouchableOpacity>
                        </View>

                        {question.answers.map((answer, answerIndex) => (
                            <View key={answer.id} style={styles.answerRow}>
                                <TouchableOpacity
                                    style={[
                                        styles.radioCircle,
                                        answer.correct && styles.radioSelected,
                                    ]}
                                    onPress={() =>
                                        setCorrectAnswer(questionIndex, answerIndex)
                                    }
                                />

                                <TextInput
                                    style={[styles.input, styles.answerInput]}
                                    placeholder={`Resposta ${answerIndex + 1}`}
                                    value={answer.text}
                                    onChangeText={(text) =>
                                        updateAnswer(questionIndex, answerIndex, text)
                                    }
                                />

                                {question.answers.length > 2 && (
                                    <TouchableOpacity
                                        onPress={() =>
                                            removeAnswer(questionIndex, answerIndex)
                                        }
                                    >
                                        <Text style={styles.btnRemoveText}>✕</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        ))}
                    </View>
                ))
            )}

            <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.btnSecondary} onPress={onBack}>
                    <Text style={styles.btnSecondaryText}>Voltar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnPrimary} onPress={onNext}>
                    <Text style={styles.btnText}>Próximo</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


function StepPreview({
                         formData,
                         onBack,
                         onSave,
                     }: {
    formData: ActivityData;
    onBack: () => void;
    onSave: () => void;
}) {
    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>Resumo</Text>

            <View style={styles.tagsRow}>
                <Text style={styles.tag}>{formData.type}</Text>
                <Text style={styles.tag}>{formData.level}</Text>
            </View>

            <Text style={styles.summaryTitle}>
                {formData.title || 'Sem título'}
            </Text>

            <Text style={styles.summaryDescription}>
                {formData.description || 'Sem descrição'}
            </Text>

            {formData.questions.map((question, questionIndex) => (
                <View key={question.id} style={styles.previewQuestion}>
                    <Text style={styles.questionTitle}>
                        {questionIndex + 1}. {question.text}
                    </Text>

                    {question.answers.map((answer, answerIndex) => (
                        <Text
                            key={answer.id}
                            style={[
                                styles.previewText,
                                answer.correct && styles.correctAnswer,
                            ]}
                        >
                            {answerIndex + 1}. {answer.text}
                            {answer.correct ? ' (Correta)' : ''}
                        </Text>
                    ))}
                </View>
            ))}

            <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.btnSecondary} onPress={onBack}>
                    <Text style={styles.btnSecondaryText}>Voltar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnPrimary} onPress={onSave}>
                    <Text style={styles.btnText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    content: {
        padding: 16,
    },
    stepperContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    stepItem: {
        alignItems: 'center',
    },
    badge: {
        width: 25,
        height: 25,
        borderRadius: 20,
        backgroundColor: '#CBD5E1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeActive: {
        backgroundColor: '#2563EB',
    },
    badgeText: {
        color: '#374151',
        fontWeight: 'bold',
    },
    badgeTextActive: {
        color: '#FFFFFF',
    },
    stepLabel: {
        fontSize: 11,
        color: '#374151',
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#CBD5E1',
        marginHorizontal: 6,
    },
    card: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#374151',
        marginBottom: 12,
    },
    label: {
        marginTop: 10,
        marginBottom: 5,
        color: '#374151',
        fontWeight: '600',
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginVertical: 4,
    },
    optionLabel: {
        color: '#374151',
    },
    input: {
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#F8FAFC',
        marginBottom: 10,
    },
    textArea: {
        height: 90,
        textAlignVertical: 'top',
    },
    btnPrimary: {
        flex: 1,
        backgroundColor: '#2563EB',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        marginTop: 18,
    },
    btnText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    btnSecondary: {
        flex: 1,
        backgroundColor: '#E2E8F0',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        marginTop: 18,
    },
    btnSecondaryText: {
        color: '#374151',
        fontWeight: 'bold',
    },
    buttonGroup: {
        flexDirection: 'row',
        gap: 10,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    btnAdd: {
        backgroundColor: '#374151',
        padding: 8,
        borderRadius: 6,
    },
    btnAddText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    emptyText: {
        textAlign: 'center',
        color: '#64748B',
        marginVertical: 25,
    },
    questionCard: {
        backgroundColor: '#F1F5F9',
        borderRadius: 8,
        padding: 10,
        marginTop: 10,
    },
    questionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    questionTitle: {
        color: '#374151',
        fontWeight: 'bold',
    },
    btnRemoveText: {
        color: '#EF4444',
        fontWeight: 'bold',
    },
    optionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    sectionLabel: {
        fontSize: 13,
        color: '#64748B',
        fontWeight: '600',
    },
    btnAddOptionText: {
        color: '#2563EB',
        fontWeight: 'bold',
    },
    answerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    answerInput: {
        flex: 1,
    },
    radioCircle: {
        width: 20,
        height: 20,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#94A3B8',
    },
    radioSelected: {
        backgroundColor: '#2563EB',
        borderColor: '#2563EB',
    },
    tagsRow: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 10,
    },
    tag: {
        backgroundColor: '#DBEAFE',
        color: '#1D4ED8',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 5,
    },
    summaryTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#374151',
    },
    summaryDescription: {
        color: '#64748B',
        marginTop: 5,
    },
    previewQuestion: {
        marginTop: 12,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 8,
    },
    previewText: {
        color: '#374151',
        marginTop: 4,
    },
    correctAnswer: {
        color: '#2563EB',
        fontWeight: 'bold',
    },
});