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
    marginRight: 65,
    marginBottom: 25,
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
    fontWeight:"bold",
    textAlign: "center",
    color: "#2C4B4E",
    marginBottom:25
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
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#0f9d58",
    borderRadius: 15,
    marginBottom: 20,
    padding: 10,
    fontSize: 16,
    color: "#0f9d58",
  },
  buttonContainer: {
    marginBottom: 25,
  },
  saveButton: {
    backgroundColor: "#00AD71",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
}); 

export default styles;