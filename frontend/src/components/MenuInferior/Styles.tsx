import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  MenuInferior: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#f5f5f5",
    height: 80,
  },

  logo: {
    width: 50,
    height: 50,
  },
});

export default Styles;