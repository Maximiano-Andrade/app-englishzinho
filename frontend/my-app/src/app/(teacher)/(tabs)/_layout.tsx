import {Tabs, router} from "expo-router";
import {Pressable, TouchableOpacity, Image, StyleSheet, Text} from "react-native";

import Ionicons from '@expo/vector-icons/Ionicons';

import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Layout() {

    const [usuario, setUsuario] = useState<{
        nome: string;
        foto_perfil?: string;
    } | null>(null);


    useEffect(() => {
        async function carregarUsuario() {
            const dados = await AsyncStorage.getItem('@usuario');

            if (dados) {
                setUsuario(JSON.parse(dados));
            }
        }

        carregarUsuario();
    }, []);

    const ProfileAvatar = () => {
        const primeiroNome = usuario?.nome?.split(' ')[0] || 'Professor';

        return (
            <TouchableOpacity
                onPress={() => router.push('/login')}
                style={styles.headerContainer}
            >
                <Text style={styles.userName}>Olá, {primeiroNome}</Text>

                <Image
                    source={{
                        uri:
                            usuario?.foto_perfil ||
                            'https://pixabay.com/pt/images/download/whitesession-woman-2112292_1920.jpg',
                    }}
                    style={styles.avatar}
                />
            </TouchableOpacity>
        );
    };

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
                title: 'Home',
                headerRight: () => <ProfileAvatar/>,
                tabBarIcon: ({color, focused}) => (
                    <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24}/>
                ),

            }}/>

            <Tabs.Screen name="creater" options={{
                title: 'Cria',
                headerTitle: 'Cria atividade',
                tabBarIcon: ({color, focused}) => (
                    <Ionicons name={focused ? 'add' : 'add-outline'} color={color} size={24}/>
                ),
            }}/>

            <Tabs.Screen name="progress" options={{
                headerTitle: 'Englishzinho',
                title: 'progress',
                headerRight: () => <ProfileAvatar/>,
                tabBarIcon: ({color, focused}) => (
                    <Ionicons name={focused ? 'people' : 'people-outline'} color={color} size={24}/>
                ),
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