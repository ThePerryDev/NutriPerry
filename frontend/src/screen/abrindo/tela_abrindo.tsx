import React, { useEffect } from "react";
import { View, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/rootStack";
import styles from "./styles";

type ContinuarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "TelaLogin"
>;

const AbrindoApp: React.FC = () => {
  const navigation = useNavigation<ContinuarScreenNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("TelaLogin");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.imagecontainer}>
        <Image
          source={require("../../assets/logonutriperry.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerlabel}>NUTRIPERRY</Text>
      </View>
    </View>
  );
};

export default AbrindoApp;
