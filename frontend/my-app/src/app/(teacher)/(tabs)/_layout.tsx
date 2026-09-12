import { Tabs, router } from "expo-router";
import { Pressable, TouchableOpacity, Image, StyleSheet, Text } from "react-native";

import Ionicons from '@expo/vector-icons/Ionicons';

export default function Layout() {

    const ProfileAvatar = () => (
        <TouchableOpacity onPress={() => router.push('/login')}
            style={styles.headerContainer}>
            <Text style={styles.userName}>Olá, Professor Maxim</Text>
            <Image
                source={{ uri: 'https://img.magnific.com/fotos-gratis/mulher-sorridente-a-ensinar_23-2149272223.jpg?semt=ais_hybrid&w=740&q=80' }}
                style={styles.avatar}
            />
        </TouchableOpacity>
    );

    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#2563EB',
            
            tabBarButton: ({ref, ...props}) => (
          <Pressable
            {...props}
            android_ripple={null} 
            style={({ pressed }) => [
              props.style,
              { opacity: pressed ? 0.6 : 1 },
            ]}
          />
        ),
        }}>
            <Tabs.Screen name="index" options={{
                headerTitle: 'Inicio',
                title: 'Home',
                headerRight: () => <ProfileAvatar />,
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
                ),
               
            }} />

            <Tabs.Screen name="creater" options={{
                title: 'creater',
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? 'add' : 'add-outline'} color={color} size={24} />
                ),
            }} />

            <Tabs.Screen name="progress" options={{
                headerTitle: 'Progresso',
                title: 'progress',
                headerRight: () => <ProfileAvatar />,
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? 'people' : 'people-outline'} color={color} size={24} />
                ),
            }} />

        </Tabs>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16, // Afasta o conjunto inteiro da borda direita da tela
        gap: 12, // Espaçamento entre o nome e a foto
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16,
        borderWidth: 2,
        borderColor: '#2563EB',
    },

    userName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
    },

});