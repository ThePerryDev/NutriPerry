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
    marginRight:90,
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
  searchcontainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 30,
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
  buttoncontainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  mealItem: {
    flex:1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 12,
    marginBottom: 30,
  },

  mealInfo: {
    flex: 1,
    marginLeft: 10,
  },

  mealName: {
    color: "#2C4B4E",
    fontSize: 16,
    fontWeight: "bold",
  },

  mealDetail: {
    fontSize: 14,
    color: "#2C4B4E",
  },
  dietbuttoncontainer: {
    justifyContent:"space-evenly",
    alignItems:"center",
    marginBottom:"25%",
  },
});

export default styles;
