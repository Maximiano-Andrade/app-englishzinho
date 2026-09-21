import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

import CreaterAtividades from '../../../componets/CreaterAtividades';
import { listarAtividadesDoProfessor } from '../../../services/api';


type AtividadeType = {
  id: number;
  professor_id: number;
  title: string;
  description: string;
  type: 'Quiz' | 'Escuta' | 'Fala';
  level: string;
  created_at: string;
};

type UsuarioSalvo = {
  id_usuario: number;
  id_professor: number | null;
  nome: string;
  tipo_usuario: 'ALUNO' | 'PROFESSOR';
};


export default function User() {
  const router = useRouter();

  const [atividades, setAtividades] = useState<AtividadeType[]>([]);
  const [carregando, setCarregando] = useState(true);

  const carregarAtividades = useCallback(async () => {
    try {
      setCarregando(true);

      const usuarioSalvo = await AsyncStorage.getItem('@usuario');

      if (!usuarioSalvo) {
        setAtividades([]);
        return;
      }

      const usuario: UsuarioSalvo = JSON.parse(usuarioSalvo);

      if (!usuario.id_professor) {
        setAtividades([]);
        return;
      }

      const dados = await listarAtividadesDoProfessor(
        usuario.id_professor,
      );

      setAtividades(dados);
    } catch (error) {
      console.log('Erro ao buscar atividades:', error);
    } finally {
      setCarregando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarAtividades();
    }, [carregarAtividades]),
  );

  return (
    <View style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.viewCardsCreator}>
          <Text style={styles.title}>Atividades</Text>

          <CreaterAtividades
            onPress={() =>
              router.push('/(teacher)/(tabs)/creater')
            }
          />
        </View>

        <View style={styles.containerAtividadesCriadas}>
          <Text style={styles.atividadesCriadasText}>
            Atividades Criadas
          </Text>

          {carregando ? (
            <ActivityIndicator size="large" color="#2563EB" />
          ) : (
            <FlatList
              data={atividades}
              keyExtractor={(item) => String(item.id)}
              contentContainerStyle={styles.cardsContainer}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <Text style={styles.emptyText}>
                  Nenhuma atividade criada ainda.
                </Text>
              }
              renderItem={({ item }) => (
                <View style={styles.cardContainer}>
                  <View style={styles.cardIconTitle}>
                    <AntDesign
                      style={styles.cardIcon}
                      name={
                        item.type === 'Quiz'
                          ? 'bars'
                          : item.type === 'Fala'
                            ? 'audio'
                            : 'sound'
                      }
                      size={24}
                      color="#F97316"
                    />

                    <View style={styles.cardTitleType}>
                      <Text style={styles.cardTitle}>{item.title}</Text>

                      <Text style={styles.cardTypeLevel}>
                        {item.type} • {item.level}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.cardDescDate}>
                    <Text style={styles.cardDescription}>
                      {item.description}
                    </Text>

                    <View style={styles.cardDate}>
                      <Text>
                        {new Date(item.created_at).toLocaleDateString(
                          'pt-BR',
                        )}
                      </Text>

                      <Text>0/0 completo</Text>
                    </View>
                  </View>
                </View>
              )}
            />
          )}
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },

  viewContainer: {
    flex: 1,
    width: '100%',
    gap: 10,
  },

  viewCardsCreator: {
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    borderColor: '#9CA3AF',
  },

  title: {
    fontFamily: 'Inter_800ExtraBold',
    fontSize: 30,
    color: '#374151',
    textAlign: 'center',
  },

  containerAtividadesCriadas: {
    flex: 1,
    gap: 5,
  },

  atividadesCriadasText: {
    fontFamily: 'Inter_600SemiBold',
    color: '#374151',
    fontSize: 15,
  },

  cardsContainer: {
    gap: 5,
    paddingBottom: 295,
  },

  emptyText: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 25,
    fontFamily: 'Inter_500Medium',
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
    borderColor: '#F97316',
  },

  cardTitleType: {
    gap: 5,
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

  cardDescDate: {
    gap: 10,
    marginTop: 10,
  },

  cardDescription: {
    fontFamily: 'Inter_300Light',
    fontSize: 15,
    color: '#374151',
  },

  cardDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});