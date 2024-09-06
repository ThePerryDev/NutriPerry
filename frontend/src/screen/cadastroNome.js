import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from "react-native";

function TelaCadNome(navigation) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return (
        <View style={styles.container}>
            <View style={styles.cima}>
                <TouchableOpacity
                    style={styles.volta}
                    onPress={() => navigation.navigate('paginaAnterior')}>
                    <Image source={require('../assets/setaVolta.png')}></Image>
                </TouchableOpacity>
                <Text>(1/5)</Text>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('../assets/image01.png')} style={styles.image} />
                <Text style={styles.textgeral}>Insira o seu primeiro nome</Text>
                <TextInput
                    value={username}
                    onChangeText={(username) => setUsername(username)}
                    style={styles.input}
                />
                <Text style={styles.textgeral}>Insira o seu sobrenome</Text>
                <TextInput
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                    secureTextEntry={true}
                    style={styles.input}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Pagina2')}>

                    <Text style={{ color: "#FFFFFF", fontSize: 30 }}>CONTINUAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TelaCadNome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBFBFB',
        width: '100%',
        height: '100%'
    },

    cima: {
        flexDirection: 'row',
        flex: 1
    },

    volta: {
        marginRight: 100
    },

    button: {
        height: 68,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        backgroundColor: '#00AD71',
        borderRadius: 25
    },

    textgeral: {
        marginTop: 55,
        marginBottom: 7,
        marginLeft: -150,
        fontFamily: 'Be Vietnam Pro'
    },

    image: {
        height: 270,
        width: 290
    },

    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        height: 68,
        width: 300,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#00AD71'
    }
});