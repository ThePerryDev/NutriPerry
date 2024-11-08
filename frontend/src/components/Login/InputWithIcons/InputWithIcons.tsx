// InputWithIcon.tsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TextInputProps,
} from "react-native";
import styles from "./styles";

interface InputWithIconProps extends TextInputProps {
  iconSource: any;
  style?: any;
}

const InputWithIcon: React.FC<InputWithIconProps> = ({
  iconSource,
  placeholder,
  secureTextEntry,
  style,
  ...rest
}) => {
  const [value, setValue] = useState("");

  return (
    <View style={[styles.container, style]}>
      <Image source={iconSource} style={styles.icon} />
      <TextInput
        placeholder={placeholder || ""}
        style={[styles.textinput, style]}
        value={value}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
        accessibilityLabel={placeholder}
        {...rest}
      />
    </View>
  );
};

export default InputWithIcon;
