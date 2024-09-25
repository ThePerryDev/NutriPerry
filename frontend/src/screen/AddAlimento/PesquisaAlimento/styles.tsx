import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 30,
    color:"#2C4B4E",
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    height: 50,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#00AD71'
},

  mealItem: {
    height:120,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },

  mealInfo: {
    flex: 1,
    marginLeft: 10,
  },

  mealName: {
    fontSize: 16,
    fontWeight: "bold",
  },

  mealDetail: {
    fontSize: 14,
    color: "#888",
  },

  buttoncontainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent:"center",
    paddingBottom: 5,
  },
});

export default styles;
