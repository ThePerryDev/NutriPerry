import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface InputProps {
  placeholder?: string; // placeholder é opcional
}

const Input: React.FC<InputProps> = ({ placeholder }) => {
  const [value, setValue] = useState('');

  return (
    <TextInput
      placeholder={placeholder}
      style={styles.input}
      value={value}
      onChangeText={setValue} 
      accessibilityLabel={placeholder} // Melhora a acessibilidade
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 3, 
    borderColor: '#00AD71',
    backgroundColor: '#fff',
    width: 300
  },
});

export default Input;
