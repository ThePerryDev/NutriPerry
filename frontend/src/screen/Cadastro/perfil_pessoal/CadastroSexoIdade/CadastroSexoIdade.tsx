import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { imagem3, setaVolta } from "../../../../assets";
import styles from ".";
import { Picker } from "@react-native-picker/picker";

const CadastroSexoIdade = () => {
  const [sexo, setSexo] = useState<string>("");
  const [idade, setIdade] = useState<string>("");

  return (
    <View style={styles.container}>
      <View style={styles.cima}>
        <TouchableOpacity style={styles.volta}>
          <Image source={setaVolta} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20 }}>(3/5)</Text>
      </View>
      <Image source={imagem3} style={styles.image} resizeMode="contain" />
      <Text style={styles.textgeral}>Insira seu sexo</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={sexo} onValueChange={(sexo) => setSexo(sexo)}>
          <Picker.Item label="Masculino" value="masculino" />
          <Picker.Item label="Feminino" value="feminino" />
        </Picker>
      </View>
      <Text style={styles.textgeral}>Insira sua idade</Text>
      <TextInput
        value={idade}
        onChangeText={(idade) => setIdade(idade)}
        style={styles.input}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button}>
        <Text style={{ color: "#FFFFFF", fontSize: 30 }}>CONTINUAR</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CadastroSexoIdade;
