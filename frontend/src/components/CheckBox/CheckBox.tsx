import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const CheckBox = (ValoresChecados: any) => {
  let UpdateChecagem = [...ValoresChecados];

  return (
    <TouchableOpacity>
      <MaterialIcons name={"check-box-outline-blank"} size={24} />
    </TouchableOpacity>
  );
};

export default CheckBox;
