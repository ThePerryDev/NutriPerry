import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft:5,
    marginRight:30,
    marginBottom: 15,
    marginTop:30,
  },
  arrow:{
    width:30,
    height:30,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2C4B4E",
  },
  explanation:{
    fontSize: 16,
    textAlign: "center",
    color: "#2C4B4E",
  },
  quantitycontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"center",
    marginTop:25,
    marginBottom: 25,
  },
  textgeral: {
    fontSize: 18,
    color: "#2C4B4E",
    fontWeight: "bold",
    marginRight: 10,
  },
  input: {
    width: 185,
    height: 35,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#00AD71",
    borderRadius: 15,
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },
  buttoncontainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default styles;
