import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import styles from "./styles";

function TelaCadNutriTelefone() {

    const [nome, setNome] = useState<string>("");
    const [sobrenome, setSobrenome] = useState<string>("");

    return (
        <View style={styles.container}>
            <View style={styles.cima}>
                <TouchableOpacity style={styles.volta}>
                    <Image source={require('../../../../assets/setaVolta.png')} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20 }}>(1/5)</Text>
            </View>
            <Image source={require('../../../../assets/telefone.png')}
                style={styles.image}
                resizeMode='contain'
            />
            <Text style={styles.textgeral}>Insira o seu telefone</Text>
            <TextInput
                value={nome}
                onChangeText={(nome) => setNome(nome)}
                style={styles.input}
            />
            <Text style={styles.textgeral}>Insira o seu local de trabalho</Text>
            <TextInput
                value={sobrenome}
                onChangeText={(sobrenome) => setSobrenome(sobrenome)}
                style={styles.input}
            />
            <TouchableOpacity
                style={styles.button}>
                <Text style={{ color: "#FFFFFF", fontSize: 30 }}>CONTINUAR</Text>
            </TouchableOpacity>
        </View>
    );
}

export default TelaCadNutriTelefone;

