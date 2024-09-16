import React from "react";
import { TouchableOpacity, Text, GestureResponderEvent } from "react-native";
import styles from "./styles";

interface ContinueButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  title?: string;
}

const ContinueButton: React.FC<ContinueButtonProps> = ({ onPress, title = "CONTINUAR" }) => {
  return (
    <TouchableOpacity style={styles.continuebutton} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ContinueButton;

