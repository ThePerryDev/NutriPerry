import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { BotoesInferiorProps } from "../../types";
import Styles from "./Styles";

const BotoesInferior = ({ children }: BotoesInferiorProps) => {
  return (
    <TouchableOpacity>
      <Image source={children} style={Styles.logo} />
    </TouchableOpacity>
  );
};

export default BotoesInferior;
