import React from "react";
import { TouchableOpacity, Text, GestureResponderEvent } from "react-native";
import styles from "./styles";

interface AddMealButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  title?: string;
}

const AddMealButton: React.FC<AddMealButtonProps> = ({ onPress, title = "Adicionar Alimento" }) => {
  return (
    <TouchableOpacity style={styles.continuebutton} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}; 

export default AddMealButton;
