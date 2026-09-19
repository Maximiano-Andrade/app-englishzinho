import {View, Text, StyleSheet, ScrollView, Image} from "react-native";
import {useLocalSearchParams, Link} from "expo-router";
import YoutubePlayer from "react-native-youtube-iframe";

type VideoType = {
    id: number;
    title: string;
    description: string;
    type: string;
    nivel: string;
    url: string;
};

export default function Video() {
    const {videoSelecionado: videoParam, listaVideos} =
        useLocalSearchParams<{
            videoSelecionado: string;
            listaVideos: string;
        }>();

    const videoSelecionado: VideoType | null = videoParam
        ? JSON.parse(videoParam)
        : null;

    const videos: VideoType[] = listaVideos
        ? JSON.parse(listaVideos)
        : [];

    return (
        <View style={styles.container}>
            <View style={{gap: 10}}>
                <View style={styles.cardVideo}>
                    <YoutubePlayer
                        height={213}
                        videoId={videoSelecionado?.url ?? ''}
                    />
                    <View style={styles.videoInfo}>
                        <View style={styles.VideoTags}>
                            <Text style={styles.tag}>{videoSelecionado?.nivel}</Text>
                            <Text style={styles.tag}>{videoSelecionado?.type}</Text>
                        </View>
                        <View style={styles.videoTitleDiscription}>
                            <Text style={styles.videoTitle}>{videoSelecionado?.title}</Text>
                            <Text style={styles.videoDescription}>{videoSelecionado?.description}</Text>
                        </View>
                    </View>
                </View>

                <ScrollView contentContainerStyle={styles.relatedVideo} showsVerticalScrollIndicator={false}>
                    {videos.map((video) => (
                        <Link key={video.id} style={styles.cardVideoRecommendation}
                              href={{
                                  pathname: '/videoTela',
                                  params: {
                                      videoSelecionado: JSON.stringify(video),
                                      listaVideos: JSON.stringify(videos),
                                  }
                              }}
                        >
                            <Image
                                source={{uri: `https://img.youtube.com/vi/${video.url}/mqdefault.jpg`}}
                                style={{
                                    width: 181,
                                    height: 120,
                                    borderTopLeftRadius: 5,
                                    borderBottomLeftRadius: 5
                                }}
                                resizeMode='cover'
                            />

                            <View style={styles.recommendationTitleNivelType}>
                                <Text style={styles.recommendationTitle}>{video.title}</Text>
                                <View style={styles.recommendationTags}>
                                    <Text style={styles.recommendationTag}>{video.nivel}</Text>
                                    <Text style={styles.recommendationTag}>{video.type}</Text>
                                </View>
                            </View>

                        </Link>
                    ))}
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
    cardVideo: {
        backgroundColor: '#F3F4F6',
        borderWidth: 1,
        borderColor: 'rgb(156 163 175 / 0.31)',
        borderRadius: 5,
        gap: 5
    },
    videoInfo: {
        paddingHorizontal: 15,
        paddingBottom: 10,
        gap: 10
    },
    VideoTags: {
        flexDirection: 'row',
        gap: 10
    },
    tag: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 5,
    },
    videoTitleDiscription: {},
    videoTitle: {
        fontSize: 16,
        fontFamily: 'Inter_500Medium',
    },
    videoDescription: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
    },

    relatedVideo: {
        gap: 10,
        paddingBottom: 350
    },
    cardVideoRecommendation: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#9CA3AF',
        flexDirection: 'row',
        width: '100%',
        height: 120,

    },
    recommendationTitleNivelType: {
        height: '100%',
        width: '100%',
        padding: 15,
        gap: 5,
    },
    recommendationTitle: {
        fontSize: 15,
        fontFamily: 'Inter_400Regular',
    },

    recommendationTags: {
        flexDirection: 'row',
        gap: 5
    },

    recommendationTag: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        fontSize: 10,
        color: '#374151',
        fontFamily: 'Inter_500Medium',
        backgroundColor: 'rgb(156 163 175 / 0.31)',
    }
})
