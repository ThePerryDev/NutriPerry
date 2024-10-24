import { StyleSheet, Platform } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
    padding: 40,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 5,
  },
  headerlabel: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    textShadowColor: "#004700",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  imagecontainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 5,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  inputcontainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    borderRadius: 5,
  },
  buttontext: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00AD71",
  },
  loginbutton: {
    height: 68,
    borderRadius: 25,
    backgroundColor: "#00AD71",
    justifyContent: "center",
    alignItems: "center",
  },
  loginbuttonText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff",
  },
});

export default styles;
