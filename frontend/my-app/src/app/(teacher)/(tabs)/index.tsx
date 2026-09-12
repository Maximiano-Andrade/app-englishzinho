import { StyleSheet, Text, View, FlatList } from "react-native";
import CreaterAtividades from "../../../componets/CreaterAtividades";
import { useRouter } from "expo-router";

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
      duration: '10 min',
      completed: '0/0 completo',
      icon: 'card-text-outline', // Sugestão de ícone
    },
    {
      id: '2',
      title: 'Pratica Pronuncia Fala',
      type: 'Fala',
      level: 'Iniciante',
      date: '12/02/2025',
      description: 'Pratique falar frases comuns em inglês com pronúncia correta...',
      duration: '20 min',
      completed: '0/0 completo',
      icon: 'person-voice', // Sugestão de ícone
    },
    {
      id: '3',
      title: 'Vocabulario basico Escuta',
      type: 'Escuta',
      level: 'Iniciante',
      date: '12/02/2025',
      description: 'Teste seu conhecimento de palavras comuns em inglês usadas no dia a dia...',
      duration: '15 min',
      completed: '0/0 completo',
      icon: 'ear-hearing', // Sugestão de ícone
    },
  ];

  return (

    <View style={styles.container}>
      <View style={styles.ViewContainter}>
        <View style={styles.ViewCadrsCreater}>
          <Text style={styles.text}>Atividades</Text>
          <CreaterAtividades onPress={() => router.push('/(teacher)/(tabs)')} />
        </View>

        <View style={styles.containerAtividadeCriadas}>
          <Text>Atividades Criadas</Text>
          <View>
            <FlatList
              data={atividades}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View >
                  <Text >{item.title}</Text>
                  <Text >{item.type} • {item.level}</Text>
                  <Text >{item.description}</Text>
                  <Text>{item.duration} - {item.completed}</Text>
                </View>
              )}
            />
          </View>
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
    paddingTop: 5
  },

  ViewContainter: {
    width: '100%',
    gap: 10,
    backgroundColor: '#ccc',
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
    backgroundColor: '#e00d0dff',
  }

});