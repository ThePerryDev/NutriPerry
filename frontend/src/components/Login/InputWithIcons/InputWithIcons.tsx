// InputWithIcon.tsx
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, TextInputProps } from 'react-native';
import styles from "./styles";

// Definindo o tipo das props do componente
interface InputWithIconProps extends TextInputProps {
  iconSource: any; // Tipo da fonte da imagem (pode ser uma URI ou require)
}

const InputWithIcon: React.FC<InputWithIconProps> = ({ iconSource, placeholder, secureTextEntry, ...rest }) => {
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <Image source={iconSource} style={styles.icon} />
      <TextInput
        placeholder={placeholder}
        style={styles.textinput}
        value={value}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}  // Usando a prop secureTextEntry
        accessibilityLabel={placeholder} // Melhora a acessibilidade
        {...rest}  // Passa todas as outras props restantes
      />
    </View>
  );
};

export default InputWithIcon;
