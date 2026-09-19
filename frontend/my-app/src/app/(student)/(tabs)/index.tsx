import {ScrollView, StyleSheet, Text, View} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import TreeButton from "../../../componets/TreeButton";
import {router} from "expo-router";

export default function Home() {
    const atividades = [
        {
            id: '1',
            title: 'Vocabulario basico Quiz',
            type: 'Quiz',
            level: 'Iniciante',
            date: '12/02/2025',
            description: 'Teste seu conhecimento de palavras comuns em inglês usadas no dia a dia...',
            completed: '0/0 completo',
            icon: "bars",
        },
        {
            id: '2',
            title: 'Pratica Pronuncia Fala',
            type: 'Fala',
            level: 'Iniciante',
            date: '12/02/2025',
            description: 'Pratique falar frases comuns em inglês com pronúncia correta...',
            completed: '0/0 completo',
            icon: "audio",
        },

        {
            id: '3',
            title: 'Vocabulario basico Escuta',
            type: 'Escuta',
            level: 'Iniciante',
            date: '12/02/2025',
            description: 'Teste seu conhecimento de palavras comuns em inglês usadas no dia a dia...',

            completed: '0/0 completo',
            icon: "sound",
        },
        {
            id: '4',
            title: 'Vocabulario basico Escuta',
            type: 'Escuta',
            level: 'Iniciante',
            date: '12/02/2025',
            description: 'Teste seu conhecimento de palavras comuns em inglês usadas no dia a dia...',

            completed: '0/0 completo',
            icon: "sound",
        },
         {
            id: '5',
            title: 'Pratica Pronuncia Fala',
            type: 'Fala',
            level: 'Iniciante',
            date: '12/02/2025',
            description: 'Pratique falar frases comuns em inglês com pronúncia correta...',
            completed: '0/0 completo',
            icon: "audio",
        },
    ]

    const formatIconName = (name: any) => {
        if (!name) return 'question';
        return name.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.containerMain} showsVerticalScrollIndicator={false}>
                <View style={styles.mainCard1}>
                    <View>
                        <Text style={styles.cardTitle}>Exercicio feitos</Text>
                    </View>
                    <View style={styles.cardsIn}>
                        <View style={styles.cards}>
                            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                                <AntDesign name="bars" size={24} color="#F97316"/>
                                <Text
                                    style={{color: '#374151', fontFamily: 'Inter_500Medium', fontSize: 20}}>Quiz</Text>
                            </View>
                            <Text style={{fontSize: 25, fontFamily: 'Inter_300Light', color: '#F97316'}}> 4</Text>
                        </View>

                        <View style={styles.cards}>
                            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                                <AntDesign name="customer-service" size={24} color="#F97316"/>
                                <Text style={{
                                    color: '#374151',
                                    fontFamily: 'Inter_500Medium',
                                    fontSize: 20
                                }}>Escuta</Text>
                            </View>
                            <Text style={{fontSize: 25, fontFamily: 'Inter_300Light', color: '#F97316'}}> 23</Text>
                        </View>

                        <View style={styles.cards}>
                            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                                <AntDesign name="audio" size={24} color="#F97316"/>
                                <Text
                                    style={{color: '#374151', fontFamily: 'Inter_500Medium', fontSize: 20}}>Fala</Text>
                            </View>
                            <Text style={{fontSize: 25, fontFamily: 'Inter_300Light', color: '#F97316'}}> 14</Text>
                        </View>
                    </View>
                </View>

                <View style={{gap: 5}}>
                    <View>
                        <Text style={{color: '#374151', fontFamily: 'Inter_500SemiBold', fontSize: 15}}>Sugerido para
                            você</Text>
                    </View>
                    <View style={styles.mainCard2}>
                        {
                            atividades.map((atividade, index) => (
                                <View key={atividade.id} style={styles.card2}>
                                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                                        <AntDesign style={styles.cardIcon} name={formatIconName(atividade.icon)}
                                                   size={24} color="#F97316"/>
                                        <View>
                                            <Text style={styles.card2Title}>{atividade.title}</Text>
                                            <Text style={styles.card2Title}>{atividade.type} • {atividade.level}</Text>
                                        </View>
                                    </View>

                                    <View style={{gap: 10}}>
                                         <Text style={styles.card2Description}>{atividade.description}</Text>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <Text>{atividade.date}</Text>
                                            <TreeButton  onPress={() => router.push('/(student)/atividade')}/>
                                        </View>
                                    </View>

                                </View>
                            ))
                        }
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
        gap: 10
    },

    // CARD DE EXERCICIOS FEITOS
    mainCard1: {
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#9CA3AF',
    },
    cardTitle: {
        fontSize: 25,
        fontFamily: 'Inter_800ExtraBold',
        color: '#374151'
    },
    cardsIn: {
        flexDirection: 'row',
        gap: 5
    },
    cards: {
        padding: 5,
        flex: 1,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#9CA3AF',
    },

    // CARD DE ATIVIDADE SUGERIDAS
    mainCard2: {
        gap: 5
    },
    cardIcon: {
        borderWidth: 2,
        padding: 5,
        borderRadius: 5,
        borderColor: "#F97316"
    },
    card2: {
        gap: 10,
        borderWidth: 1,
        borderColor: '#9CA3AF',
        borderRadius: 5,
        padding: 10,
    },
    card2Title: {
        fontSize: 15,
        fontFamily: 'Inter_400Regular',
        color: '#374151'
    },
    card2SubTitle: {
        fontSize: 10,
        fontFamily: 'Inter_600SemiBold',
    },
    card2Description: {
        fontSize: 15,
        fontFamily: 'Inter_300Light',
        color: '#374151'
    }
});