import React, { useContext, useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "./styles";
import { AuthContext } from "../../../context/auth/AuthContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/rootStack";

interface LoginButtonProps {
  title?: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({ title = "LOGIN" }) => {
  return (
    <TouchableOpacity style={styles.continuebutton}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default LoginButton;
