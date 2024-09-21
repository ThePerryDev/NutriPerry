import React from "react";
import { TouchableOpacity, Text, GestureResponderEvent } from "react-native";
import styles from "./styles";

interface ContinueButtonV2Props {
  onPress: (event: GestureResponderEvent) => void;
  title?: string;
}

const ContinueButtonV2: React.FC<ContinueButtonV2Props> = ({ onPress, title = "CONTINUAR" }) => {
  return (
    <TouchableOpacity style={styles.continuebutton} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ContinueButtonV2;

