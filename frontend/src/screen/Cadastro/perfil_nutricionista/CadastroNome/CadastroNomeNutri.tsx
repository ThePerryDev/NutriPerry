import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import styles from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../types/rootStack";
import { image01, setaVolta } from "../../../../assets";

type ContinuarScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "CadastroNutriNome"
>;

type Props = {
    navigation: ContinuarScreenNavigationProp;
};

const CadastroNutriNome: React.FC<Props> = ({ navigation }) => {
    const [nome, setNome] = useState<string>("");
    const [sobrenome, setSobrenome] = useState<string>("");

    return (
        <View style={styles.container}>
            <View style={styles.cima}>
                <TouchableOpacity style={styles.volta}>
                    <Image source={setaVolta} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20 }}>(1/5)</Text>
            </View>
            <Image source={image01}
                style={styles.image}
                resizeMode='contain'
            />
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
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("CadastroNutriEmail")}>
                <Text style={{ color: "#FFFFFF", fontSize: 30 }}>CONTINUAR</Text>
            </TouchableOpacity>
        </View>
    );
}

export default CadastroNutriNome;
