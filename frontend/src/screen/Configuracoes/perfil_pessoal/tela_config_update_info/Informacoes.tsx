import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from "react-native";
import styles from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../types/rootStack";
import { setaVolta } from "../../../../assets";
import { MenuInferior } from "../../../../components";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context";
import moment from "moment";

type ContinuarScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "TelaUpdateInformacoes"
>;

type Props = {
    navigation: ContinuarScreenNavigationProp;
};

const Informacoes: React.FC<Props> = ({ navigation }) => {
    const { user } = useContext(AuthContext);
    const [idade, setIdade] = useState<string>("");
    const [altura, setAltura] = useState<string>("");
    const [peso, setPeso] = useState<string>("");
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
                const response = await fetch(`http://10.68.55.153:3000/user/objetivo?userId=${user?.id}`);
                if (!response.ok) {
                    throw new Error("Erro ao buscar dados do usuário");
                }

                const data = await response.json();

                // Preenche os campos com os dados recebidos
                setAltura(data.height?.toString() || "");
                setPeso(data.weight?.toString() || "");
                setNivelAtividade(data.activityLevel || "");
                setObjetivo(data.goal || "");
                setDataNascimento(moment.utc(data.birthdate).format("DD-MM-YYYY") || "");
                setMetabolismoBasal(data.taxaBasal.toFixed(2) ?? 0);
                setObjetivoCalorico(data.kcalObjetivo.toFixed(2) ?? 0);
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
    

    return (
        <View style={styles.container}>
            <View style={styles.cima}>
                <TouchableOpacity style={styles.volta} onPress={() => navigation.navigate("TelaConfiguracoes")}>
                    <Image source={setaVolta} />
                </TouchableOpacity>
                <Text style={styles.titulo}>Configurações</Text>
            </View>
    
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                <View style={styles.viewAdendo}>
                    <Text style={styles.subtitulo}>
                        Alterar as informações de cadastro irá modificar alguns cálculos disponibilizados
                    </Text>
                </View>
    
                <View style={styles.conteudo}>
                    {/* Altura */}
                    <Text style={styles.texto}>Altura (cm)</Text>
                    <Text style={styles.input}>{altura || "Exemplo: 175"}</Text>
    
                    {/* Peso */}
                    <Text style={styles.texto}>Peso (kg)</Text>
                    <Text style={styles.input}>{peso || "Exemplo: 70"}</Text>
    
                    {/* Nível de Atividade */}
                    <Text style={styles.texto}>Nível de Atividade</Text>
                    <Text style={styles.input}>{nivelAtividade || "Exemplo: Moderado"}</Text>
    
                    {/* Objetivo */}
                    <Text style={styles.texto}>Objetivo</Text>
                    <Text style={styles.input}>{objetivo || "Exemplo: Ganhar Massa"}</Text>
    
                    {/* Data de Nascimento */}
                    <Text style={styles.texto}>Data de Nascimento</Text>
                    <Text style={styles.input}>{dataNascimento || "Exemplo: 01/01/2000"}</Text>
    
                    {/* Metabolismo Basal */}
                    <Text style={styles.texto}>Metabolismo Basal</Text>
                    <Text style={styles.input}>{metabolismoBasal}</Text>
    
                    {/* Objetivo Calórico */}
                    <Text style={styles.texto}>Objetivo Calórico</Text>
                    <Text style={styles.input}>{objetivoCalorico || "Exemplo: 2000 kcal"}</Text>
                </View>
            </ScrollView>
    
            {/* Menu Inferior fixo */}
            <View style={styles.menuInferior}>
                <MenuInferior navigation={navigation} />
            </View>
        </View>
    );
    
};

export default Informacoes;
function fetchUserData() {
    throw new Error("Function not implemented.");
}

