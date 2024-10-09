import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
    padding: 50,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
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
    marginTop: 40,
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  inputcontainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom:25
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    borderRadius: 5,
  },
  buttontext:{
    justifyContent: "center",
    alignItems: "center",
    fontSize:16,
    fontWeight:"bold",
    color:"#00AD71",
  },
});

export default styles;
