import {View, Text, StyleSheet} from "react-native";

export default function Progress(){
    return (
        <View style={styles.container}>
            <View>

            </View>
                <Text>Progress</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 5,
    }
})