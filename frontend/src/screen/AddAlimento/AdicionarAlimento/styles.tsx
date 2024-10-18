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
    fontSize: 16,
    textAlign: "center",
    color: "#2C4B4E",
  },
  quantitycontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  textgeral: {
    fontSize: 18,
    color: "#2C4B4E",
    fontWeight: "bold",
    marginRight: 20,
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
    paddingLeft: 20,
  },
  infocontainer: {
    height: 305,
    backgroundColor: "#f5f5f5",
    borderRadius: 15,
    padding: 10,
  },
  infotitle: {
    fontSize: 14,
    color: "#2C4B4E",
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 10,
  },
  head: {},
  textHead: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 10,
    padding: 5,
    color: "#2C4B4E",
  },
  row: {
    height: 28,
    color: "#2C4B4E",
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 10,
    color: "#2C4B4E",
  },
  savebuttoncontainer: {
    marginTop: 15,
    marginBottom: 15,
  },
  datePickerButton: {
    width: 185,
    height: 35,
    borderWidth: 2,
    borderColor: "#00AD71",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  dateText: {
    width: 185,
    height: 35,
    borderWidth: 2,
    borderColor: "#00AD71",
    borderRadius: 15,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
    color: "#2C4B4E",
    textAlign: "center",
    paddingTop: 6, // Centraliza verticalmente
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"center",
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: "#2C4B4E",
    fontWeight: "bold",
    marginBottom: 5,
  },
  quantitytext:{
    fontSize: 18,
    color: "#2C4B4E",
    fontWeight: "bold",
    marginRight: 20,
  }

});

export default styles;