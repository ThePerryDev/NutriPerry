import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFBFB",
    padding: 30,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  arrow: {
    width: 30,
    height: 30,
  },
  headerlabel: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C4B4E",
  },
  image: {
    height: 250,
    width: "100%",
    resizeMode: "contain",
    marginBottom: 15,
  },
  textgeral: {
    marginTop: 5,
    marginBottom: 7,
    fontSize: 20,
    color: "#2C4B4E",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    height: 68,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#00AD71",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  pickerLabel: {
    marginTop: 5,
    marginBottom: 7,
    fontSize: 20,
    color: "#2C4B4E", // Mesmo estilo do textgeral
  },
  picker: {
    fontSize: 16,
    height: 68,
    color: "#2C4B4E",
    alignItems: "center",
  },
  buttoncontainer: {
    marginTop: 35,
    alignItems: "center",
  },
});

export default styles;
