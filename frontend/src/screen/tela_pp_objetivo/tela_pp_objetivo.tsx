import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "./styles";

export default function TelaPPObjetivo() {
  const [selectRole, setSelectRole] = useState("");

  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text style={styles.headerlabel}>(5/5)</Text>
        </View>
        <View style={styles.imagecontainer}>
          <Image
            source={require("../../assets/pp_objetivos.png")}
            style={styles.image}
          />
        </View>
        <View>
          <Text style={styles.pickerLabel}>Qual seu objetivo com o App?</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectRole}
              onValueChange={(itemValue: string) => setSelectRole(itemValue)}
              style={styles.picker}
              mode="dropdown"
            >
              <Picker.Item label="Perder peso" value="lose" />
              <Picker.Item label="Manter peso" value="keep" />
              <Picker.Item label="Ganhar peso" value="gain" />
            </Picker>
          </View>
        </View>
        <View>
          <Text style={styles.pickerLabel}>Quanto tempo se exercitando?</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectRole}
              onValueChange={(itemValue: string) => setSelectRole(itemValue)}
              style={styles.picker}
              mode="dropdown"
            >
              <Picker.Item label="15 a 30 minutos" value="15-30" />
              <Picker.Item label="30 a 45 minutos" value="30-45" />
              <Picker.Item label="45 a 60 minutos" value="45-60" />
              <Picker.Item label="Mais de 60 minutos" value="+60" />
            </Picker>
          </View>
        </View>
      </View>
      <View style={styles.buttoncontainer}>
        <TouchableOpacity style={styles.continuebutton}>
          <Text style={styles.buttonText}>CONTINUAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
