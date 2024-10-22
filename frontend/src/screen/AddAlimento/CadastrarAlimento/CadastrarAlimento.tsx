import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/rootStack";
import MenuInferior from "../../../components/MenuInferior/MenuInferior";
import { setaVolta } from "../../../assets";
import styles from "./styles";
import FinalizeButton from "../../../components/Cadastro/Finalizar/botaofinalizar";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CadastrarAlimento"
>;

type Props = {
  navigation: ContinuarScreenNavigationProp;
};

const CadastrarAlimento: React.FC<Props> = ({ navigation }) => {
  const [productname, setProductName] = useState<string>("");
  const [productcalories, setProductCalories] = useState<string>("");
  const [productproteins, setProductProteins] = useState<string>("");
  const [productcarbs, setProductCarbs] = useState<string>("");
  const [productsugar, setProductSugar] = useState<string>("");


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => navigation.navigate("PesquisaAlimento")}
        >
          <Image source={setaVolta} style={styles.arrow} />
        </TouchableOpacity>
        <Text style={styles.header}>Cadastrar Alimento</Text>
      </View>
      <Text style={styles.explanation}>Insira o nome do alimento</Text>
      <TextInput
        value={productname}
        onChangeText={(productname) => setProductName(productname)}
        style={styles.nameinput}
      />
      <Text style={styles.explanation}>Insira os dados do alimento</Text>
      <View>
        <View style={styles.inputcontainer}>
          <Text style={styles.textgeral}>Calorias:</Text>
          <TextInput
            value={productcalories}
            onChangeText={(productcalories) => setProductCalories(productcalories)}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputcontainer}>
          <Text style={styles.textgeral}>Proteínas:</Text>
          <TextInput
            value={productproteins}
            onChangeText={(productproteins) => setProductProteins(productproteins)}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputcontainer}>
          <Text style={styles.textgeral}>Carboidratos:</Text>
          <TextInput
            value={productcarbs}
            onChangeText={(productcarbs) => setProductCarbs(productcarbs)}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputcontainer}>
          <Text style={styles.textgeral}>Açucar:</Text>
          <TextInput
            value={productsugar}
            onChangeText={(productsugar) => setProductSugar(productsugar)}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.finalizebuttoncontainer}>
          <FinalizeButton
            onPress={() =>
              navigation.navigate("Home")
            } /*Alterar para salvar os dados no cliente*/
          />
        </View>
      </View>
      <MenuInferior navigation={navigation} />
    </View>
  );
};

export default CadastrarAlimento;
