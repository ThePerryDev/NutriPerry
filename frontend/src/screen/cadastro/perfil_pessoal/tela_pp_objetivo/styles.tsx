import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 300,
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop:20
  },
  arrow:{
    width:30,
    height:30,
  },
  headerlabel:{
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C4B4E",
    alignItems: "flex-end"
  },
  imagecontainer: {
    alignItems: "center",
    marginTop:10,
    marginBottom: 15,
  },
  image: {
    width: 300,
    height: 250,
    resizeMode: "contain",
  },
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
  },
  buttoncontainer: {
    marginTop: 35,
  },
  continuebutton: {
    width: 300,
    height: 68,
    borderRadius: 25,
    backgroundColor: "#00AD71",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff",
    alignItems: "center",
  },
});

export default styles;
