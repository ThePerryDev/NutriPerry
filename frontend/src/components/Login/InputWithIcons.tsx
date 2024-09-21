// InputWithIcon.tsx
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, TextInputProps } from 'react-native';

// Definindo o tipo das props do componente
interface InputWithIconProps extends TextInputProps {
  iconSource: any; // Tipo da fonte da imagem (pode ser uma URI ou require)
}

const InputWithIcon: React.FC<InputWithIconProps> = ({ iconSource, placeholder }) => {
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <Image source={iconSource} style={styles.icon} />
      <TextInput
      placeholder={placeholder}
      style={styles.input}
      value={value}
      onChangeText={setValue} 
      accessibilityLabel={placeholder} // Melhora a acessibilidade
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#00AD71',
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 8, // Espaçamento entre o ícone e o campo de input
  },
  input: {
    flex: 1, // Permite que o input ocupe o espaço restante
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
});

export default InputWithIcon;
