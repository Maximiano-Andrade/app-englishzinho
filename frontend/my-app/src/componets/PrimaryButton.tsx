import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface PrimaryButtonProps {
  title?: string;
  onPress: () => void;
}

export default function PrimaryButton({ title = "COMEÇAR", onPress }: PrimaryButtonProps) {
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
    backgroundColor: '#2563EB', // Azul vibrante da imagem
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 100,
    borderRadius: 30, // Bordas bem arredondadas (pílula)
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 6px 14px rgba(156, 163, 175, 100)',
    
    // Sombra para Android
    elevation: 6,
          
    // Sombra para iOS
    shadowColor: 'rgba(156, 163, 175, 100)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  buttonText: {
    fontFamily: 'Inter_800ExtraBold',
    color: '#FFFFFF',
    fontSize: 30,
    letterSpacing: 1.2, // Espaçamento suave entre as letras
  },
});