import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFBFB",
    padding:30,
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
    alignItems:"center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C4B4E",
  },
  imagecontainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
  pickerLabel: {
    fontSize: 16,
    marginTop: 13,
    marginBottom: 13,
    color: "#2C4B4E",
    textAlign: "center",
  },
  pickerContainer: {
    height: 68,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#00AD71",
    borderRadius: 25,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    marginBottom: 10,
    alignItems: "center",
  },
  picker: {
    fontSize: 16,
    height: 68,
    color: "#2C4B4E",
    alignItems:"center"
  },
  buttoncontainer: {
    marginTop: 25,
    alignItems: "center",
  },
});

export default styles;
