import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import styles from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../types/rootStack";
import { setaVolta } from "../../../../assets";
import { MenuInferior } from "../../../../components";
import { useState } from "react";

type ContinuarScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "TelaInformacoes"
>;

type Props = {
    navigation: ContinuarScreenNavigationProp;
};

const Informacoes: React.FC<Props> = ({ navigation }) => {
    const [idade, setIdade] = useState<string>("");
    const [altura, setAltura] = useState<string>("");
    const [peso, setPeso] = useState<string>("");
<<<<<<< Updated upstream
=======
    const [nivelAtividade, setNivelAtividade] = useState<string>("");
    const [objetivo, setObjetivo] = useState<string>("");
    const [dataNascimento, setDataNascimento] = useState<string>("");
    const [metabolismoBasal, setMetabolismoBasal] = useState<string>("");
    const [objetivoCalorico, setObjetivoCalorico] = useState<string>("");
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        // Função para buscar os dados do usuário
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://192.168.0.20:3000/user/objetivo?userId=${user?.id}`);
                if (!response.ok) {
                    throw new Error("Erro ao buscar dados do usuário");
                }

                const data = await response.json();

                // Preenche os campos com os dados recebidos
                setAltura(data.height?.toString() || "");
                setPeso(data.weight?.toString() || "");
                setNivelAtividade(data.activityLevel || "");
                setObjetivo(data.goal || "");
                setDataNascimento(moment(data.birthdate).format("DD-MM-YYYY") || "");
                setMetabolismoBasal(data.taxaBasal?.toString() || "");
                setObjetivoCalorico(data.kcalObjetivo?.toString() || "");
            } catch (error) {
                console.error("Erro ao buscar dados do usuário:", error);
            }
        };

        fetchUserData();
    }, [user?.id]);


    const capitalizeWords = (text: string) => {
        return text
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };
    

>>>>>>> Stashed changes
    return (
        <View style={styles.container}>
            <View style={styles.cima}>
                <TouchableOpacity style={styles.volta} onPress={() => navigation.navigate("TelaConfiguracoes")}>
                    <Image source={setaVolta} />
                </TouchableOpacity>
                <Text style={styles.titulo}>Configurações</Text>

            </View>
            <View style={styles.viewAdendo}>
                <Text style={styles.subtitulo}>Alterar as informações de cadastro irá modificar alguns cálculos disponibilizados</Text>
            </View>
            <View style={styles.conteudo}>
                <Text style={styles.texto}>Insira sua idade</Text>
                <TextInput
                    value={idade}
                    placeholder={"Exemplo: 16"}
                    onChangeText={(idade) => setIdade(idade)}
                    style={styles.input}
                    keyboardType="numeric"
                />
                <Text style={styles.texto}>Insira sua altura (cm)</Text>
                <TextInput
                    value={altura}
                    placeholder={"Exemplo: 175"}
                    onChangeText={(altura) => setAltura(altura)}
                    style={styles.input}
                />
                <Text style={styles.texto}>Insira seu peso (kg)</Text>
                <TextInput
                    value={peso}
                    placeholder={"Exemplo: 70"}
                    onChangeText={(peso) => setPeso(peso)}
                    style={styles.input}
                    keyboardType="numeric"
                />

                <TouchableOpacity style={styles.buttonSalvar}>
                    <Text style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 900, }}>SALVAR</Text>
                </TouchableOpacity>
            </View>

            <MenuInferior navigation={navigation} />
        </View>
    );
}

export default Informacoes;