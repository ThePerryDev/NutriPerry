import React from "react";
import { TouchableOpacity, Text, GestureResponderEvent } from "react-native";
import styles from "./styles";

interface SaveButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  title?: string;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onPress, title = "Salvar" }) => {
  return (
    <TouchableOpacity style={styles.continuebutton} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SaveButton;
