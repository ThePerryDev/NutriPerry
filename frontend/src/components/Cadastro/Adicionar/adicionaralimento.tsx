import React from "react";
import { TouchableOpacity, Text, GestureResponderEvent } from "react-native";
import styles from "./styles";

interface AddAlimentoButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  title?: string;
}

const AddAlimentoButton: React.FC<AddAlimentoButtonProps> = ({ onPress, title = "ADICIONAR" }) => {
  return (
    <TouchableOpacity style={styles.addbutton} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AddAlimentoButton;

