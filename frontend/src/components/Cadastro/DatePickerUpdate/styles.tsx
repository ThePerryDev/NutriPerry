import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%", // Ocupa toda a largura disponível no pai
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // Alinha à esquerda
  },
  dateText: {
    fontSize: 18,
    color: "#2C4B4E",
  },
  dateBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    height: 40,
    width: "100%", // Ajusta ao tamanho do contêiner pai
    maxWidth: 320, // Garante que siga o limite de largura
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#00AD71",
    marginTop: 10,
    paddingLeft: 20,
  },
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // Alinha à esquerda como os outros inputs
  },
});

export default styles;
