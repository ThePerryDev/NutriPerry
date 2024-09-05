import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from "react-native";

function TelaCadNome(navigation) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return (
        <View style={styles.container}>
            <Image source={require('../assets/image01.png')} style={styles.image}/>
            <Text style={styles.textgeral}>Insira o seu primeiro nome</Text>
            <TextInput
                value={username}
                onChangeText={(username) => setUsername(username)}
                placeholder={'Entre com Username'}
                style={styles.input}
            />
            <Text style={styles.textgeral}>Insira o seu primeiro nome</Text>
            <TextInput
                value={password}
                onChangeText={(password) => setPassword(password)}
                placeholder={'Password'}
                secureTextEntry={true}
                style={styles.input}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Pagina2')}>

                <Text style={{ color: "white", padding: 10 }}>LOGIN </Text>
            </TouchableOpacity>
        </View>
    )
}

export default TelaCadNome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBFBFB',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textgeral: {
        marginTop: 55,
        marginBottom: 7,
        marginLeft: -150
    },

    image: {
        height: 270,
        width: 290
    },

    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        height: 68,
        width: 298,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#00AD71'
    }
});