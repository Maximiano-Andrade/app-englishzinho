import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";

interface PrimaryButtonProps {
    title?: string;
    onPress: () => void;
}

export default function PrimaryButton({title = "COMEÇAR", onPress}: PrimaryButtonProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={styles.container}
        >
            <Ionicons name="play-outline" size={24} color="#F3F4F6"/>
            <Text adjustsFontSizeToFit
                  style={{color: '#F3F4F6', fontSize: 15, fontFamily: 'Inter_800ExtraBold'}}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F97316',
        gap: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5
    }
})