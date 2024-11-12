import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  textgeral: {
    marginTop: 5,
    marginBottom: 7,
    fontSize: 20,
    color: "#2C4B4E",
  },
  pickerContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    height: 40,
    width: 320,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#00AD71",
    marginTop: 10,
    justifyContent: "center", // Centraliza verticalmente o conteúdo
    paddingHorizontal: 10, // Espaçamento interno para a esquerda e direita
  },
  picker: {
    fontSize: 16,
    color: "#2C4B4E",
    height: "100%", // Garante que o Picker ocupe toda a altura do contêiner
  },
});

export default styles;
