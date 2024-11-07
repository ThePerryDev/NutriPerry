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
    marginRight: 60,
    marginBottom: 15,
    marginTop: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  columnHeaderHistorico: {
    width: 169,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2C4B4E",
  },
  columnHeaderData: {
    width: 100,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2C4B4E",
  },
  columnHeaderBotao: {
    width: 40,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2C4B4E",
  },
  historico: {
    width: 169,
    height: 40,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 40,
    color: "#2C4B4E",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  data: {
    width: 100,
    height: 40,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 40,
    color: "#2C4B4E",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  botao: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5f5f5",
    borderRadius: 5,
  },
  icone: {
    width: 25,
    height: 25,
  },
  listContent: {
    paddingVertical: 10,
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
