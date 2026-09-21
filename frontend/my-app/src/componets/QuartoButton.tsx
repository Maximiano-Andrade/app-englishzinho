import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";

interface PrimaryButtonProps {
    title?: string;
    onPress: () => void;
    color?: string;
    background?: string;
    icon?: string;
}

export default function PrimaryButton({title = "COMEÇAR", onPress, color, icon, background}: PrimaryButtonProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[styles.container, {backgroundColor: background,}]}

        >
            <Ionicons name={icon} size={24} color='#fff'/>
            <Text adjustsFontSizeToFit style={{color: '#fff', fontSize: 15, fontFamily: 'Inter_800ExtraBold'}}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        borderRadius: 5,
        paddingHorizontal: 8,
        paddingVertical: 3
    }
})