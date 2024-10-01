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
    marginLeft: 5,
    marginRight: 30,
    marginBottom: 15,
    marginTop: 30,
  },
  arrow: {
    width: 30,
    height: 30,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2C4B4E",
  },
  explanation: {
    fontSize: 20,
    textAlign: "center",
    color: "#2C4B4E",
    marginBottom:25
  },
  inputcontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-between",
    marginBottom: 25,
  },
  textgeral: {
    alignItems:"flex-start",
    fontSize: 18,
    color: "#2C4B4E",
    fontWeight: "bold",
    marginLeft:5
  },
  nameinput:{
    height:45,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#00AD71",
    borderRadius: 15,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    marginBottom:25
  },
  input: {
    alignItems:"flex-end",
    width: 185,
    height: 40,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#00AD71",
    borderRadius: 15,
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },
  infocontainer: {
    height: 280,
    backgroundColor: "#f5f5f5",
    borderRadius: 15,
    padding: 10,
  },
  infotitle:{
    fontSize: 16,
    color: "#2C4B4E",
    fontWeight: "bold",
    marginLeft:10,
    marginBottom:10
  },
  head: {
  },
  textHead: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 10,
    padding:5,
    color: "#2C4B4E",
  },
  row: {
    height: 28,
    color: "#2C4B4E",
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 10,
    color: "#2C4B4E",
  },
  finalizebuttoncontainer: {
    marginTop:25,
    justifyContent:"space-evenly"
  },
});

export default styles;
