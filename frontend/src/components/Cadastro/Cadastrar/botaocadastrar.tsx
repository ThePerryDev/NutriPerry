import React from "react";
import { TouchableOpacity, Text, GestureResponderEvent } from "react-native";
import styles from "./styles";

interface AddButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  title?: string;
}

const AddButton: React.FC<AddButtonProps> = ({ onPress, title = "Cadastrar" }) => {
  return (
    <TouchableOpacity style={styles.continuebutton} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}; 

export default AddButton;
