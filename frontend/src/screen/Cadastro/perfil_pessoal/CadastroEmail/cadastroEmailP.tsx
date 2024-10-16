import { useState, useContext } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import styles from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../types/rootStack";
import { image02, setaVolta } from "../../../../assets";
import { useUserContext } from "../../../../context/userContext";


type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CadastroEmail"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const CadastroEmail: React.FC<Props> = ({ navigation }) => {
    const { setUserData } = useUserContext(); // Obtendo o setUserData do contexto
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleContinue = () => {
        // Atualiza os dados do usuário no contexto
        setUserData((prevData: any) => ({
            ...prevData,
            email: email,
            password: password,
        }));
        // Navega para a próxima tela
        navigation.navigate("CadastroSexoIdade");
    };

    return (
        <View style={styles.container}>
            <View style={styles.cima}>
                <TouchableOpacity style={styles.volta}>
                    <Image source={setaVolta}></Image>
                </TouchableOpacity>
                <Text style={{ fontSize: 20 }}>(2/5)</Text>
            </View>
            <Image source={image02} style={styles.image} resizeMode='contain' />
            <Text style={styles.textgeral}>Insira seu email</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <Text style={styles.textgeral}>Insira sua senha</Text>
            <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                style={styles.input}
            />

            <TouchableOpacity style={styles.button} onPress={handleContinue}>
                <Text style={{ color: "#FFFFFF", fontSize: 30 }}>CONTINUAR</Text>
            </TouchableOpacity>
        </View>
    );
}

export default CadastroEmail;
