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
  columnHeaderAlimento: {
    width: 169,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2C4B4E",
  },
  columnHeaderQuantidade: {
    width: 46,
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
  alimento: {
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
  quantidade: {
    width: 46,
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
  datacontainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  datatext: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2C4B4E",
    marginBottom: 25,
  },
  datashow: {
    width: 95,
    height: 50,
    borderWidth: 2,
    borderColor: "#00AD71",
    borderRadius: 15,
    alignContent: "center",
    justifyContent: "center",
    marginBottom: 25,
  },
  datainfo: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2C4B4E",
  },
  AddMealButtoncontainer: {
    flex: 1,
    justifyContent: "space-evenly",
    marginBottom: 65,
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
  // Novo estilo para o contêiner do DatePicker
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  selectedDateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C4B4E",
  },
});

export default styles;
