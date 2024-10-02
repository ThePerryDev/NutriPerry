import React from "react";
import { TouchableOpacity, Text, GestureResponderEvent } from "react-native";
import styles from "./styles";

interface NewDietButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  title?: string;
}

const NewDietButton: React.FC<NewDietButtonProps> = ({ onPress, title = "Criar nova dieta" }) => {
  return (
    <TouchableOpacity style={styles.addbutton} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default NewDietButton;

