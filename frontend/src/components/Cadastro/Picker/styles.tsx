import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  pickerLabel: {
    fontSize: 16,
    marginTop: 13,
    marginBottom: 13,
    color: "#2C4B4E",
  },
  pickerContainer: {
    width: 300,
    height: 68,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#00AD71",
    borderRadius: 25,
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },
  picker: {
    fontSize: 16,
    height: 68,
    color: "#2C4B4E",
  }
});

export default styles;
