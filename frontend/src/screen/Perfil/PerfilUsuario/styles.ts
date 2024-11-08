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
    marginBottom: 15,
    marginTop: 30,
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
    marginVertical: 20,
  },
  botaoTexto: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  infoContainer: {
    width: "100%",
    marginTop: 20,
    alignItems: "center",
  },
  info: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2C4B4E",
    marginBottom: 20, // Espaçamento entre as linhas de texto
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
  spacer: {
    flex: 1,
  },
});

export default styles;
