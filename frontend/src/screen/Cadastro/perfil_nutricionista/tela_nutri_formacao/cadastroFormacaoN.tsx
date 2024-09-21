import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import styles from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../types/rootStack";
import { profissao, setaVolta } from "../../../../assets";

type ContinuarScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "CadastroNutriFormacao"
>;

type Props = {
    navigation: ContinuarScreenNavigationProp;
};

const CadastroNutriFormacao: React.FC<Props> = ({ navigation }) =>  {
    const [formacao, setFormacao] = useState<string>("");
    const [anoformacao, setAnoformacao] = useState<string>("");

    return (
        <View style={styles.container}>
            <View style={styles.cima}>
                <TouchableOpacity style={styles.volta}>
                    <Image source={setaVolta}></Image>
                </TouchableOpacity>
                <Text style={{ fontSize: 20 }}>(3/4)</Text>
            </View>

            <Image source={profissao} style={styles.image} resizeMode='contain' />

            <Text style={styles.textgeral}>Insira sua formação</Text>

            <TextInput
                value={formacao}
                onChangeText={(formacao) => setFormacao(formacao)}
                style={styles.input}
            />


            <Text style={styles.textgeral}>Insira o ano da sua formação</Text>

            <TextInput
                value={anoformacao}
                onChangeText={(anoformacao) => setAnoformacao(anoformacao)}
                style={styles.input}
            />

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("CadastroNutriTelefone")}>
                <Text style={{ color: "#FFFFFF", fontSize: 30 }}>CONTINUAR</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CadastroNutriFormacao;

