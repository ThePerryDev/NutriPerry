import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from "react-native";

function TelaCadEmail(navigation) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <View style={styles.container}>
            <View style={styles.cima}>
                <TouchableOpacity
                    style={styles.volta}
                    onPress={() => navigation.navigate('paginaAnterior')}>
                    <Image source={require('../assets/setaVolta.png')}></Image>
                </TouchableOpacity>
                <Text style={{fontSize: 20}}>(2/5)</Text>
            </View>

            <Image source={require('../assets/image02.png')} style={styles.image} resizeMode = 'contain' />
            <Text style={styles.textgeral}>Insira seu email</Text>
            <TextInput
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={styles.input}
            />
            <Text style={styles.textgeral}>Insira sua senha</Text>
            <TextInput
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry={true}
                style={styles.input}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Pagina3')}>

                <Text style={{ color: "#FFFFFF", fontSize: 30 }}>CONTINUAR</Text>
            </TouchableOpacity>
        </View>
    )
}

export default TelaCadEmail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBFBFB',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    cima: {
        flexDirection: 'row',
    },

    volta: {
        marginRight: 250
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
        marginLeft: -180,
        fontSize: 20,
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