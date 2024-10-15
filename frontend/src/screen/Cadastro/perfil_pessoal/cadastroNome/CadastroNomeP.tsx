import { useState, useContext } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import styles from "./stylesNome";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../types/rootStack";
import { image01, setaVolta } from "../../../../assets";
import { useUserContext } from "../../../../context/userContext";
import { UsersProps } from "../../../../types";


type ContinuarScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "CadastroNome"
>;

type Props = {
    navigation: ContinuarScreenNavigationProp;
};


//DANI AINDA VAI ARRUMAR
const CadastroNome: React.FC<Props> = ({ navigation }) => {
    const { setUserData } = useUserContext(); // Obtendo o setUserData do contexto
    const [nome, setNome] = useState<string>("");
    const [sobrenome, setSobrenome] = useState<string>("");

    const handleContinue = () => {
        // Atualiza os dados do usuário no contexto
        setUserData((prevData:any) => ({
            ...prevData,
            name: nome,
            nickname: sobrenome,
        }));
        // Navega para a próxima tela
        navigation.navigate("CadastroEmail");
    };

    return (
        <View style={styles.container}>
            <View style={styles.cima}>
                <TouchableOpacity style={styles.volta}>
                    <Image source={setaVolta} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20 }}>(1/5)</Text>
            </View>
            <Image source={image01} style={styles.image} resizeMode='contain' />
            <Text style={styles.textgeral}>Insira o seu primeiro nome</Text>
            <TextInput
                value={nome}
                onChangeText={setNome}
                style={styles.input}
            />
            <Text style={styles.textgeral}>Insira o seu sobrenome</Text>
            <TextInput
                value={sobrenome}
                onChangeText={setSobrenome}
                style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={handleContinue}>
                <Text style={{ color: "#FFFFFF", fontSize: 30 }}>CONTINUAR</Text>
            </TouchableOpacity>
        </View>
    );
}

export default CadastroNome;