import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from "react-native";

function TelaCadNome({ navigation }) {

    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");

    return (
        <View style={styles.container}>
            <View style={styles.cima}>
                <TouchableOpacity
                    style={styles.volta}
                    onPress={() => navigation.navigate('paginaAnterior')}>
                    <Image source={require('../assets/setaVolta.png')} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20 }}>(1/5)</Text>
            </View>
            <Image source={require('../assets/image01.png')} style={styles.image} resizeMode='contain' />
            <Text style={styles.textgeral}>Insira o seu primeiro nome</Text>
            <TextInput
                value={nome}
                onChangeText={(nome) => setNome(nome)}
                style={styles.input}
            />
            <Text style={styles.textgeral}>Insira o seu sobrenome</Text>
            <TextInput
                value={sobrenome}
                onChangeText={(sobrenome) => setSobrenome(sobrenome)}
                style={styles.input}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('TelaCadEmail')}>
                <Text style={{ color: "#FFFFFF", fontSize: 30 }}>CONTINUAR</Text>
            </TouchableOpacity>
        </View>
    );
}

export default TelaCadNome;

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
        marginLeft: -130,
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
