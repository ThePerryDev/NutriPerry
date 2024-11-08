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
    marginRight: 120,
    marginTop: 30,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2C4B4E",
  },
  botaoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  },
  botao: {
    width: 250,
    height: 60,
    backgroundColor: "#00AD71", // Verde
    paddingVertical: 12,
    borderRadius: 15, // Bordas arredondadas
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 25,
  },
  botaoTexto: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  infoHeaderContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  infoContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight:20,
    marginLeft:20
  },
  infotitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C4B4E",
  },
  info: {
    fontSize: 16,
    color: "#2C4B4E",
  },
  infocarregando: {
    fontSize: 20,
    color: "#2C4B4E",
    fontWeight: "bold",
    marginTop:120,
    marginBottom:100,
    textAlign:"center"
  },
  arrow: {
    width: 30,
    height: 30,
  },
  username: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2C4B4E",
    marginBottom:20,
  },
  spacer: {
    flex: 1,
  },
});

export default styles;
