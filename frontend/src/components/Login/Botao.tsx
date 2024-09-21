// Button.tsx
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
} from "react-native";

// Definindo o tipo das props do componente
interface BotaoProps {
  title: string; // Texto exibido no botão
  onPress: () => void; // Função chamada quando o botão é pressionado
  color?: string; // Cor de fundo do botão, opcional
  width?: string | number; // Largura do botão, opcional
  style?: StyleProp<ViewStyle>; // Estilo adicional para o botão, opcional
  textStyle?: StyleProp<TextStyle>; // Estilo adicional para o texto do botão, opcional
}

const Botao: React.FC<BotaoProps> = ({
  title,
  onPress,
  color = "#6200ee", // Cor padrão
  width = "100%", // Largura padrão
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        // { backgroundColor: color, width },
        style,
      ]} // Combina estilos fixos e dinâmicos
      onPress={onPress} // Função chamada ao pressionar o botão
      activeOpacity={0.8} // Efeito de opacidade ao pressionar
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>{" "}
      {/* Texto do botão com estilo opcional */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Botao;
