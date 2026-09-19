import {router, Tabs} from 'expo-router';
import {Image, Pressable, StyleSheet, Text, TouchableOpacity} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {

    const ProfileAvatar = () => (
        <TouchableOpacity onPress={() => router.push('/login')}
                          style={styles.headerContainer}>
            <Text style={styles.userName}>Hello! Mario</Text>
            <Image
                source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCgKuIQccHhGprKeBE3__HPBWCvxWvr-pLPMiIyMwQCfLDrpqZYShnDZ4&s=10'}}
                style={styles.avatar}
            />
        </TouchableOpacity>
    );

    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#2563EB',
            headerTitleStyle: {
                fontFamily: 'Inter_800ExtraBold',
                fontSize: 20,
                color: '#2563EB',
            },
            tabBarButton: ({ref, ...props}) => (
                <Pressable
                    {...props}
                    android_ripple={null}
                    style={({pressed}) => [
                        props.style,
                        {opacity: pressed ? 0.6 : 1},
                    ]}
                />
            ),
        }}>
            <Tabs.Screen name="index" options={{
                headerTitle: 'Englishzinho',
                title: '',
                headerRight: () => <ProfileAvatar/>,
                tabBarIcon: ({color, focused}) => (
                    <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24}/>
                ),

            }}/>

            <Tabs.Screen name="progress" options={{
                headerTitle: 'Progresso',
                title: '',
                headerTitleAlign: 'center',
                tabBarIcon: ({color, focused}) => (
                    <Ionicons name={focused ? 'bar-chart' : 'bar-chart-outline'} color={color} size={24}/>
                ),
            }}
            />

             <Tabs.Screen name="biblioteca" options={{
                 headerTitle: 'Biblioteca',
                 title: '',
                 headerTitleAlign: 'center',
                 tabBarIcon: ({color, focused}) => (
                     <Ionicons name={focused ? 'play' : 'play-outline'} size={24} color={color} />
                 )
             }}/>
        </Tabs>
    );
}
const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16, // Afasta o conjunto inteiro da borda direita da tela
        gap: 5, // Espaçamento entre o nome e a foto
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 35,
    },
    userName: {
        fontSize: 15,
        fontFamily: 'Inter_600SemiBold',
        color: '#374151',
    },
});