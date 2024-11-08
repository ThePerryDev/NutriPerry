import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 68,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#00AD71",
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    marginTop: 30,
    marginBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  textinput: {
    fontSize: 16,
    color: "#2C4B4E",
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "#FF725E",
    marginTop: 5,
  },
});

export default styles;
