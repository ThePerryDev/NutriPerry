import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"center",
    marginTop:25,
    marginBottom: 25,
  },
  pickerLabel: {
    fontSize: 18,
    color: "#2C4B4E",
    fontWeight: "bold",
    marginRight: 30,
  },
  pickerContainer: {
    width: 185,
    height: 35,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#00AD71",
    borderRadius: 15,
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
