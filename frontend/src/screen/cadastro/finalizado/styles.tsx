import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#00AD71"
  },
  headerContainer: {
    alignItems: "center",
    width: 315,
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop:20
  },
  headerlabel:{
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff",
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
  buttoncontainer: {
    marginTop: 35,
  },
  continuebutton: {
    width: 300,
    height: 68,
    borderRadius: 25,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#00AD71",
    alignItems: "center",
  },
});

export default styles;
