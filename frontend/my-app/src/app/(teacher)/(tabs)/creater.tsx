import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import {Checkbox, Host} from "@expo/ui/jetpack-compose";

// Tipagem dos Dados
interface Question {
    id: string;
    text: string;
    options: string[];
    correctAnswerIndex: number;
}

interface ActivityData {
    title: string;
    description: string;
    type: string;
    level: string;
    questions: Question[];
}

const opcoesLevel = [
    {id: 'Iniciante', label: 'Iniciante'},
    {id: 'Intermediário', label: 'Intermediário'},
    {id: 'Avançado', label: 'Avançado'},
];

const opcoesType = [
    {id: 'Quiz', label: 'Quiz'},
    {id: 'Escuta', label: 'Escuta'},
    {id: 'Fala', label: 'Fala'},
];

export default function Creater() {
    const [currentStep, setCurrentStep] = useState<number>(1);

    // Estado global do formulário
    const [formData, setFormData] = useState<ActivityData>({
        title: '',
        description: '',
        type: 'Quiz',
        level: '',
        questions: [],
    });

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

    return (
        <View style={styles.container}>
            {/* Header com os Passos (Stepper) */}
            <View style={styles.stepperContainer}>
                <StepIndicator step={1} currentStep={currentStep} label="Info Básico"/>
                <View style={styles.line}/>
                <StepIndicator step={2} currentStep={currentStep} label="Questão"/>
                <View style={styles.line}/>
                <StepIndicator step={3} currentStep={currentStep} label="Preview"/>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Passo 1: Informações Básicas */}
                {currentStep === 1 && (
                    <StepBasicInfo
                        formData={formData}
                        setFormData={setFormData}
                        onNext={nextStep}
                    />
                )}

                {/* Passo 2: Adicionar Questões */}
                {currentStep === 2 && (
                    <StepQuestions
                        formData={formData}
                        setFormData={setFormData}
                        onNext={nextStep}
                        onBack={prevStep}
                    />
                )}

                {/* Passo 3: Review / Salvar */}
                {currentStep === 3 && (
                    <StepPreview
                        formData={formData}
                        onBack={prevStep}
                        onSave={() => console.log('Salvar Atividade:', formData)}
                    />
                )}
            </ScrollView>
        </View>
    );
}

// --- SUB-COMPONENTES ---

function StepIndicator({step, currentStep, label}: { step: number; currentStep: number; label: string }) {
    const isActive = currentStep === step;
    const isDone = currentStep > step;

    return (
        <View style={styles.stepItem}>
            <View style={[styles.badge, isActive && styles.badgeActive, isDone && styles.badgeDone]}>
                <Text style={[styles.badgeText, (isActive || isDone) && styles.badgeTextActive]}>{step}</Text>
            </View>
            <Text style={styles.stepLabel}>{label}</Text>
        </View>
    );
}

// Passo 1: Informação
function StepBasicInfo({formData, setFormData, onNext}: any) {
    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>Informação</Text>

            <Text style={styles.label}>Título da Atividade*</Text>
            <TextInput
                style={styles.input}
                placeholder="Gramática"
                value={formData.title}
                onChangeText={(text) => setFormData({...formData, title: text})}
            />

            <Text style={styles.label}>Level da atividade*</Text>
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
                            colors={{checkedColor: '#2563EB', checkmarkColor: '#FFF'}}
                        />
                    </Host>
                    <Text style={styles.optionLabel}>{opcao.label}</Text>
                </View>
            ))}

            <Text style={styles.label}>Tipo da atividade*</Text>
            {opcoesType.map((opcao) => (
                <View key={opcao.id} style={styles.checkboxRow}>
                    <Host matchContents>
                        <Checkbox
                            value={formData.type === opcao.id}
                            onCheckedChange={(checked) =>
                                setFormData({
                                    ...formData,
                                    type: checked ? opcao.id : '',
                                })
                            }
                            colors={{checkedColor: '#2563EB', checkmarkColor: '#FFF'}}
                        />
                    </Host>
                    <Text style={styles.optionLabel}>{opcao.label}</Text>
                </View>
            ))}

            <Text style={styles.label}>Descrição*</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                multiline
                placeholder="Descreva sua atividade"
                value={formData.description}
                onChangeText={(text) => setFormData({...formData, description: text})}
            />

            <TouchableOpacity style={styles.btnPrimary} onPress={onNext}>
                <Text style={styles.btnText}>Próximo</Text>
            </TouchableOpacity>
        </View>
    );
}

// Passo 2: Lista e Adição de Questões
function StepQuestions({formData, setFormData, onNext, onBack}: any) {

    const addQuestion = () => {
        const newQuestion: Question = {
            id: Date.now().toString(),
            text: '',
            options: ['', '', ''],
            correctAnswerIndex: 0,
        };
        setFormData({...formData, questions: [...formData.questions, newQuestion]});
    };

    const updateQuestionText = (index: number, text: string) => {
        const updated = [...formData.questions];
        updated[index].text = text;
        setFormData({...formData, questions: updated});
    };

    return (
        <View style={styles.card}>
            <View style={styles.headerRow}>
                <Text style={styles.cardTitle}>Perguntas ({formData.questions.length})</Text>
                <TouchableOpacity style={styles.btnAdd} onPress={addQuestion}>
                    <Text style={styles.btnAddText}>+ Adicionar</Text>
                </TouchableOpacity>
            </View>

            {formData.questions.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Sem Pergunta adicionada</Text>
                    <Text style={styles.emptySubtext}>Clique em "Adicionar" para começar</Text>
                </View>
            ) : (
                formData.questions.map((q: Question, qIndex: number) => (
                    <View key={q.id} style={styles.questionCard}>
                        <Text style={styles.questionTitle}>Pergunta {qIndex + 1}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Texto da Pergunta *"
                            value={q.text}
                            onChangeText={(text) => updateQuestionText(qIndex, text)}
                        />
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

// Passo 3: Preview e Resumo
function StepPreview({formData, onBack, onSave}: any) {
    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>Resumo</Text>

            <View style={styles.summaryBadgeRow}>
                <Text style={styles.tag}>{formData.type}</Text>
                {formData.level ? <Text style={styles.tag}>{formData.level}</Text> : null}
            </View>

            <Text style={styles.summaryTitle}>{formData.title || 'Sem título'}</Text>
            <Text style={styles.summaryDesc}>{formData.description || 'Sem descrição'}</Text>

            {formData.questions.map((q: Question, idx: number) => (
                <View key={q.id} style={styles.previewQuestionBox}>
                    <Text style={styles.questionTitle}>Pergunta {idx + 1}</Text>
                    <Text style={styles.previewText}>{q.text || 'Texto não informado'}</Text>
                </View>
            ))}

            <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.btnSecondary} onPress={onBack}>
                    <Text style={styles.btnSecondaryText}>Voltar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btnPrimary, {backgroundColor: '#22C55E'}]} onPress={onSave}>
                    <Text style={styles.btnText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

// Estilização Base
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC'
    },

    content: {
        padding: 16
    },

    stepperContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },

    stepItem: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 6
    },

    badge: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#CBD5E1',
        justifyContent: 'center',
        alignItems: 'center'
    },

    badgeActive: {
        backgroundColor: '#2563EB'
    },

    badgeDone: {
        backgroundColor: '#10B981'
    },

    badgeText: {
        fontSize: 12,
        color: '#475569',
        fontWeight: 'bold'
    },

    badgeTextActive: {
        color: '#FFF'
    },

    stepLabel: {
        fontSize: 12,
        color: '#475569'
    },

    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#E2E8F0',
        marginHorizontal: 8
    },

    card: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0'
    },

    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#1E293B'
    },

    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#475569',
        marginTop: 12,
        marginBottom: 4
    },

    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
        gap: 8
    },

    optionLabel: {
        fontSize: 14,
        color: '#1E293B'
    },

    input: {
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#F8FAFC'
    },

    textArea: {
        height: 80,
        textAlignVertical: 'top'
    },

    btnPrimary: {
        backgroundColor: '#2563EB',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        flex: 1
    },

    btnText: {
        color: '#FFF',
        fontWeight: 'bold'
    },

    btnSecondary: {
        backgroundColor: '#E2E8F0',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        flex: 1
    },

    btnSecondaryText: {
        color: '#475569',
        fontWeight: 'bold'
    },

    buttonGroup: {
        flexDirection: 'row',
        gap: 12
    },

    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16
    },

    btnAdd: {
        backgroundColor: '#1E293B',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6
    },

    btnAddText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: 'bold'
    },

    emptyContainer: {
        padding: 32,
        alignItems: 'center'
    },

    emptyText: {
        fontWeight: 'bold',
        color: '#64748B'
    },

    emptySubtext: {
        fontSize: 12,
        color: '#94A3B8'
    },

    questionCard: {
        backgroundColor: '#F1F5F9',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12
    },

    questionTitle: {
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#334155'
    },

    summaryBadgeRow: {
        flexDirection: 'row',
        gap: 8, marginBottom: 12
    },

    tag: {
        backgroundColor: '#E0E7FF',
        color: '#3730A3',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        fontSize: 12,
        fontWeight: '600'
    },

    summaryTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0F172A'
    },

    summaryDesc: {
        color: '#64748B',
        marginVertical: 4
    },

    previewQuestionBox: {
        marginTop: 12,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 6
    },

    previewText: {
        color: '#334155'
    },
});