import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import styles from "./styles";

function TelaCadNutriEmail(){

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <View style={styles.container}>
            <View style={styles.cima}>
                <TouchableOpacity style={styles.volta}>
                    <Image source={require('../../../../assets/cadastro/setaVolta.png')}></Image>
                </TouchableOpacity>
                <Text style={{ fontSize: 20 }}>(2/5)</Text>
            </View>

            <Image source={require('../../../../assets/cadastro/image02.png')} style={styles.image} resizeMode='contain' />
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

            <TouchableOpacity style={styles.button}>
                <Text style={{ color: "#FFFFFF", fontSize: 30 }}>CONTINUAR</Text>
            </TouchableOpacity>
        </View>
    );
}

export default TelaCadNutriEmail;
