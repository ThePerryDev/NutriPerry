import React, { ReactNode } from 'react';
import { Text, StyleSheet } from 'react-native';

// Definindo o tipo das props do componente
interface TituloProps {
  children: ReactNode; // Define que children pode ser qualquer nó React
}

const Titulo: React.FC<TituloProps> = ({ children }) => {
  return <Text style={styles.titulo}>{children}</Text>;
};

const styles = StyleSheet.create({
  titulo: {
    fontSize: 24,
    fontWeight: 'bold', 
    color: '#333', 
    marginVertical: 10,
  },
});

export default Titulo;
