import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import {Link} from "expo-router";

const videos = [
    {
        id: 1,
        title: 'Gramatica Basica',
        description: "Aprenda a comprimentar as pessoas e se apresenta em inglês",
        type: 'Gramatica',
        nivel: 'Iniciante',
        url: 'tVlcKp3bWH8',
    },
    {
        id: 2,
        title: 'Gramatica Basica',
        description: "Aprenda a comprimentar as pessoas e se apresenta em inglês",
        type: 'Gramatica',
        nivel: 'Avançado',
        url: 'sK8T8gbYIfA',
    },

    {
        id: 3,
        title: 'Gramatica Basica',
        description: "Aprenda a comprimentar as pessoas e se apresenta em inglês",
        type: 'Gramatica',
        nivel: 'Intermediario',
        url: 'frN3nvhIHUk',
    },

    {
        id: 4,
        title: 'Gramatica Basica',
        description: "Aprenda a comprimenta as pessoas e se apresenta em inglês",
        type: 'Gramática',
        nivel: 'Iniciante',
        url: 'ddDN30evKPc',
    },
    {
        id: 5,
        title: 'Gramatica Basica',
        description:'Aprenda como pronuncia a letras corretamente',
        type: 'Vocabulário',
        nivel: 'Iniciante',
        url:'ChqnN3cKzXQ'
    }
];

export default function () {

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.containerMain} showsVerticalScrollIndicator={false}>
                <View style={styles.cardContainer}>
                    <View style={styles.cardTitleIcon}>
                        <Ionicons style={styles.cardIcon} name="play-outline" size={24} color="#EF4444"/>
                        <Text style={styles.cardTitle}>Biblioteca de Video</Text>
                    </View>
                    <Text style={styles.cardDescription}>Navegue e assista a videos para melhores suas habilidades em
                        inglês</Text>
                </View>

                {
                    videos.map((video) => (
                            <Link key={video.id}
                                  href={{
                                      pathname: '/videoTela',
                                      params: {
                                          videoSelecionado: JSON.stringify(video),
                                          listaVideos: JSON.stringify(videos),
                                      }
                                  }}
                                  style={styles.videoCardContainer}
                            >
                                <Image
                                    source={{uri: `https://img.youtube.com/vi/${video.url}/mqdefault.jpg`}}
                                    style={{
                                        width: '100%',
                                        height: 200,
                                        borderTopLeftRadius: 5,
                                        borderTopRightRadius: 5
                                    }}
                                    resizeMode='cover'
                                />
                                <View style={styles.videoTagsTitle}>
                                    <View style={styles.tagsVideo}>
                                        <Text style={styles.tag}>{video.nivel}</Text>
                                        <Text style={styles.tag}>{video.type}</Text>
                                    </View>
                                    <Text style={styles.videoTitle}>{video.title}</Text>
                                </View>
                            </Link>
                        )
                    )
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    containerMain: {
        gap: 10
    },
    cardContainer: {
        padding: 10,
        backgroundColor: '#EEF3FF',
        borderColor: '#BFDBFE',
        borderWidth: 1,
        borderRadius: 5
    },
    cardTitleIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    cardIcon: {
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 5,
    },
    cardTitle: {
        fontSize: 15,
        color: '#374151',
        fontFamily: 'Inter_700Bold'
    },
    cardDescription: {
        fontSize: 15,
        color: '#374151',
        fontFamily: 'Inter_300Light'
    },
    videoCardContainer: {
        borderWidth: 1,
        borderColor: '#9CA3AF',
        borderRadius: 5,
    },
    videoTagsTitle: {
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 10,
        paddingVertical: 10,
        gap: 10
    },
    tagsVideo: {
        flexDirection: 'row',
        gap: 5
    },
    tag: {
        paddingVertical: 5,
        paddingHorizontal: 7,
        borderRadius: 5,
        backgroundColor: 'rgb(156 163 175 / 0.31)',
        fontFamily: 'Inter_500Medium',
        fontSize: 16,
        color: '#374151'
    },
    videoTitle: {
        fontFamily: 'Inter_500Medium',
        fontSize: 16,
    }
})
