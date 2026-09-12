import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface CreaterAtividadesProps {
  title?: string;
  onPress: () => void;
}

export default function CreaterAtividades({ title = "Cria atividade", onPress }: CreaterAtividadesProps) {
  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText} adjustsFontSizeToFit>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#BFDBFE',
    borderRadius: 5,
    paddingVertical: 7,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(156, 163, 175, 0.31)',
  },
  buttonText: {
    color: '#374151',
    fontSize: 20,
    fontFamily: 'Inter_500Medium',
  },
});