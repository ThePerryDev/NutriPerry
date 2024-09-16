import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from "react-native";

function TelaCadFormacaoN() {
    const [formacao, setFormacao] = useState<string>("");
    const [anoformacao, setAnoformacao] = useState<string>("");

    return (
        <View style={styles.container}>
            <View style={styles.cima}>
                <TouchableOpacity style={styles.volta}>
                    <Image source={require('../../../assets/cadastro/setaVolta.png')}></Image>
                </TouchableOpacity>
                <Text style={{ fontSize: 20 }}>(2/5)</Text>
            </View>

            <Image source={require('../../../assets/cadastro/profissao.png')} style={styles.image} resizeMode='contain' />

            <Text style={styles.textgeral}>Insira sua formação</Text>

            <TextInput
                value={formacao}
                onChangeText={(formacao) => setFormacao(formacao)}
                style={styles.input}
            />


            <Text style={styles.textgeral}>                 Insira o ano da sua formação</Text>

            <TextInput
                value={anoformacao}
                onChangeText={(anoformacao) => setAnoformacao(anoformacao)}
                style={styles.input}
            />

            <TouchableOpacity style={styles.button}>
                <Text style={{ color: "#FFFFFF", fontSize: 30 }}>CONTINUAR</Text>
            </TouchableOpacity>
        </View>
    )
}

export default TelaCadFormacaoN;

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

    image: {
        height: 270,
        width: 290
    },

    textgeral: {
        marginTop: 55,
        marginBottom: 7,
        marginLeft: -150,
        fontSize: 20
    },

    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        height: 68,
        width: 300,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#00AD71'
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

});
