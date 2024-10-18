import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  textgeral: {
    marginTop: 5,
    marginBottom: 7,
    fontSize: 20, // Tamanho da fonte igual ao do textgeral
    color: "#2C4B4E", // Cor igual ao do textgeral
  },
  pickerLabel: {
    fontSize: 16,
    marginTop: 13,
    marginBottom: 13,
    color: "#2C4B4E",
  },
  pickerContainer: {
    width: "100%", // Usar 100% para se adaptar ao container pai
    height: 68,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#00AD71",
    borderRadius: 25,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    marginBottom:10
  },
  picker: {
    fontSize: 16,
    height: 68,
    color: "#2C4B4E",
  },
});

export default styles;
