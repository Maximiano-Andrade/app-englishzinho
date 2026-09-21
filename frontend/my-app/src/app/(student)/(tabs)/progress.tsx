import {View, Text, StyleSheet, ScrollView} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import {router} from 'expo-router'
import QuartoButton from "../../../componets/QuartoButton";

const atividades = [
    {
        id: 1,
        title: 'Vocabulário basico Quiz',
        type: 'Quiz',
        level: 'Iniciante',
        date: '12/02/2025',
        description: 'Teste seu conhecimento de palavras comuns em inglês usadas no dia a dia...',
        icon: "bars",
        status: 'Pendente',
    },
    {
        id: 2,
        title: 'Pratica Pronuncia Fala',
        type: 'Fala',
        level: 'Iniciante',
        date: '12/02/2025',
        description: 'Pratique falar frases comuns em inglês com pronúncia correta...',
        icon: "audio",
        status: 'Concluído',
    },
    {
        id: 3,
        title: 'Vocabulário basico Escuta',
        type: 'Escuta',
        level: 'Iniciante',
        date: '12/02/2025',
        description: 'Teste seu conhecimento de palavras comuns em inglês usadas no dia a dia...',
        icon: "sound",
        status: 'Pendente',
    },

    {
        id: 5,
        title: 'Vocabulário basico Escuta',
        type: 'Escuta',
        level: 'Iniciante',
        date: '12/02/2025',
        description: 'Teste seu conhecimento de palavras comuns em inglês usadas no dia a dia...',
        icon: "sound",
        status: 'Pendente',
    },
    {
        id: 6,
        title: 'Pratica Pronuncia Fala',
        type: 'Fala',
        level: 'Iniciante',
        date: '12/02/2025',
        description: 'Pratique falar frases comuns em inglês com pronúncia correta...',
        icon: "audio",
        status: 'Concluído',
    },
    {
        id: 7,
        title: 'Pratica Pronuncia Fala',
        type: 'Fala',
        level: 'Iniciante',
        date: '12/02/2025',
        description: 'Pratique falar frases comuns em inglês com pronúncia correta...',
        icon: "audio",
        status: 'Concluído',
    },
]

export default function Progress() {

    const formatIconName = (name: any) => {
        if (!name) return 'question';
        return name.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
    };

    return (
        <View style={styles.container}>
            <View style={{gap: 5}}>
                <View>
                    <Text style={styles.headerTitle}>Minha Atividades</Text>
                </View>
                <ScrollView contentContainerStyle={styles.cardAtividades} showsVerticalScrollIndicator={false}>
                    {
                        atividades.map((atividade) => (
                            <View key={atividade.id} style={styles.cardAtividade}>
                                <View style={styles.cardAtividadeIconTitleType}>
                                    <View style={styles.cardAtividadeIcon}>
                                        <AntDesign name={formatIconName(atividade.icon)} size={24} color="#F97316"/>
                                    </View>
                                    <View style={{gap: 5}}>
                                        <Text style={styles.cardAtividadeTitle}>{atividade.title}</Text>
                                        <Text
                                            style={styles.cardAtividadeSubtitle}>{atividade.type} {atividade.level}</Text>
                                    </View>
                                </View>
                                <Text style={styles.cardAtividadeDescription}>{atividade.description}</Text>
                                <View style={styles.cardAtividadeDateStatus}>
                                    <Text style={styles.cardAtividadeDate}>{atividade.date}</Text>
                                    <QuartoButton
                                        onPress={
                                            atividade.status === 'Pendente'
                                                ? () => router.push('/(student)/atividade')
                                                : undefined
                                        }
                                        title={atividade.status}
                                        background={atividade.status == 'Pendente' ? '#EF4444' : '#22C55E'}
                                        icon={atividade.status == 'Pendente' ? 'play-outline' : 'checkbox'}
                                    />
                                </View>
                            </View>
                        ))
                    }
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