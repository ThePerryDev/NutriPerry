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
  flatListContainer: {
    height: 250, // Limitar a altura do FlatList
  },
  listContent: {
    paddingVertical: 10,
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
    width: 20,
    height: 20,
  },
  datacontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20, // Certificar que o layout fique organizado
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
    marginBottom: 15,
  },
  datainfo: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2C4B4E",
  },
  AddMealButtoncontainer: {
    marginTop: 10,
  },
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  datePickerbutton: {
    width: 180,
    height: 30,
    backgroundColor: "#00AD71",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight:15
  },
  datapickertext: {
    fontSize: 16,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    color: "#ffffff",
  },
  selectedDateText: {
    height: 30,
    borderWidth: 2,
    borderColor: "#00AD71",
    borderRadius: 10,
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft:20,
    paddingRight:20,
    textAlignVertical: "center",
    textAlign: "center",
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
});

export default styles;