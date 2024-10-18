import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/rootStack";
import MenuInferior from "../../../components/MenuInferior/MenuInferior";
import { camera, setaVolta } from "../../../assets";
import styles from "./styles";
import AddButton from "../../../components/Cadastro/Cadastrar/botaocadastrar";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "PesquisaAlimento"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const PesquisaAlimento: React.FC<Props> = ({ navigation }) => {
  const [nomeproduct, setNomeProduct] = useState<string>("");

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.arrow} onPress={() => navigation.navigate("Home")}>
          <Image source={setaVolta} style={styles.arrow} />
        </TouchableOpacity>
        <Text style={styles.header}>Adicionar Alimento</Text>
      </View>
      <View style={styles.searchcontainer}>
        <TextInput
          value={nomeproduct}
          placeholder={"Pesquisar"}
          onChangeText={(nome) => setNomeProduct(nome)}
          style={styles.input}
        />
        <TouchableOpacity style={styles.camera} disabled={true}>
          <Image source={camera} />
        </TouchableOpacity>
      </View>
      <View style={styles.spacer} />
      <View style={styles.errorcontainer}>
        <Text style={styles.errormessage}>Alimento não encontrado</Text>
        <Text style={styles.errormessage}>Clique em cadastrar para inserir um novo alimento</Text>
      </View>
      <View style={styles.spacer} />
      <View style={styles.buttoncontainer}>
        <AddButton onPress={() => navigation.navigate("CadastrarAlimento")} />
      </View>
      <MenuInferior navigation={navigation} />
    </View>
  );
};

export default PesquisaAlimento;
