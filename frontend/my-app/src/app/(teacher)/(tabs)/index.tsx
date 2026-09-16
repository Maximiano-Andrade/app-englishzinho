import {StyleSheet, Text, View, FlatList} from "react-native";
import CreaterAtividades from "../../../componets/CreaterAtividades";
import {useRouter} from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function User() {
    const router = useRouter();

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
            title: 'Vocabulario basico Quiz',
            type: 'Quiz',
            level: 'Iniciante',
            date: '12/02/2025',
            description: 'Teste seu conhecimento de palavras comuns em inglês usadas no dia a dia...',

            completed: '0/0 completo',
            icon: "bars",
        },
        {
            id: '5',
            title: 'Vocabulario basico Escuta',
            type: 'Escuta',
            level: 'Iniciante',
            date: '12/02/2025',
            description: 'Teste seu conhecimento de palavras comuns em inglês usadas no dia a dia...',

            completed: '0/0 completo',
            icon: "sound",
        },

        {
            id: '6',
            title: 'Pratica Pronuncia Fala',
            type: 'Fala',
            level: 'Iniciante',
            date: '12/02/2025',
            description: 'Pratique falar frases comuns em inglês com pronúncia correta...',

            completed: '0/0 completo',
            icon: "audio",
        },
        {
            id: '7',
            title: 'Vocabulario basico Escuta',
            type: 'Escuta',
            level: 'Iniciante',
            date: '12/02/2025',
            description: 'Teste seu conhecimento de palavras comuns em inglês usadas no dia a dia...',
            completed: '0/0 completo',
            icon: "sound",
        },
    ];

    const formatIconName = (name: any) => {
        if (!name) return 'question';
        return name.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
    };
    return (

        <View style={styles.container}>
            <View style={styles.ViewContainter}>

                <View style={styles.ViewCadrsCreater}>
                    <Text style={styles.text}>Atividades</Text>
                    <CreaterAtividades onPress={() => router.push('/(teacher)/(tabs)')}/>
                </View>

                <View style={styles.containerAtividadeCriadas}>
                    <Text style={styles.atividadeCriadasText}>Atividades Criadas</Text>


                    <FlatList
                        data={atividades}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.cardsContainer}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => (
                            <View style={styles.cardContainer}>

                                <View style={styles.cardIconTitle}>
                                    <AntDesign style={styles.cardIcon} name={formatIconName(item.icon)} size={24}
                                               color="#F97316"/>

                                    <View style={styles.cardTitleType}>
                                        <Text style={styles.cardTitle}>{item.title}</Text>
                                        <Text style={styles.cardTypeLevel}>{item.type} • {item.level}</Text>
                                    </View>

                                </View>

                                <View style={styles.cardDescDure}>
                                    <Text style={styles.cardDescription}>{item.description}</Text>
                                    <View style={styles.cardDurationComplation}>
                                        <Text>{item.date}</Text>
                                        <View style={{flexDirection:'row', gap: 5, alignItems: 'center'}}>
                                            <AntDesign name="team" size={20} color="#374151"/>
                                            <Text>{item.completed}</Text>
                                        </View>

                                    </View>

                                </View>

                            </View>
                        )}
                    />
                </View>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 5,
        paddingBottom: 5
    },

    ViewContainter: {
        width: '100%',
        gap: 10,
    },

    ViewCadrsCreater: {
        borderRadius: 5,
        padding: 10,
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: '#9CA3AF',
    },

    text: {
        fontFamily: 'Inter_800ExtraBold',
        fontSize: 30,
        color: '#374151',
        textAlign: 'center',
    },

    containerAtividadeCriadas: {
        gap: 5,
    },

    atividadeCriadasText: {
        fontFamily: 'Inter_600SemiBold',
        color: '#374151',
        fontSize: 15,
    },

    cardsContainer: {
        gap: 5,
        paddingBottom: 295
    },

    cardContainer: {
        borderColor: '#9CA3AF',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },

    cardIconTitle: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
    },

    cardIcon: {
        borderWidth: 2,
        padding: 5,
        borderRadius: 5,
        borderColor: "#F97316"
    },
    cardTitleType: {
        gap: 5
    },

    cardTitle: {
        color: '#374151',
        fontSize: 15,
        fontFamily: 'Inter_800Regular',
    },

    cardTypeLevel: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 14,
        color: '#374151',
    },

    cardDescDure: {
        gap: 10,
    },

    cardDescription: {
        fontFamily: 'Inter_300Light',
        fontSize: 15,
    },

    cardDurationComplation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
    }

});