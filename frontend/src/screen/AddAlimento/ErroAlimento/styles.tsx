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
  searchcontainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    height: 50,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#D9D9D9',
    paddingHorizontal: 15,
  },
  camera: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#D9D9D9',
    borderRadius: 15,
  },
  errorcontainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 25,
  },
  errormessage: {
    color: "#FF725E",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom:10,
  },
  spacer: {
    flex: 1,
  },
  buttoncontainer: {
    flex:1,
    marginBottom: 10,
  },
});

export default styles;
