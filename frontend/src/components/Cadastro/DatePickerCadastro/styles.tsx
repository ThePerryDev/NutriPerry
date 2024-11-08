import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dateText: {
    textAlign: "center",
    fontSize: 18,
    color: "#2C4B4E",
    backgroundColor: "#ffffff",
  },
  dateBox: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    height: 68,
    borderWidth: 2,
    borderColor: "#00AD71",
    paddingHorizontal: 20,
    justifyContent: "center", // Centraliza o conteúdo verticalmente
    alignItems: "center", // Centraliza o conteúdo horizontalmente
    marginBottom: 10,
  },
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
