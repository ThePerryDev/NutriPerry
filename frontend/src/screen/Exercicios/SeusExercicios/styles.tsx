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
  
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#f0f0f0",
      borderRadius: 8,
      padding: 10,
      marginBottom: 20,
    },
  
    searchInput: {
      flex: 1,
      marginLeft: 10,
      fontSize: 16,
    },
  
    checkBoxPlaceholder: {
      marginRight: 10,
    },
  
    exercicioItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#f0f0f0",
      borderRadius: 8,
      padding: 15,
      marginBottom: 10,
    },
  
    exercicioText: {
      fontSize: 18,
      fontWeight: "bold",
    },
  
    exercicioCalorias: {
      fontSize: 14,
      color: "#666",
    },
  
    mealItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#f5f5f5",
      padding: 15,
      borderRadius: 12,
      marginBottom: 10,
    },
  
    mealInfo: {
      flex: 1,
      marginLeft: 10,
      color: "#2C4B4E",
    },
  
    mealName: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#2C4B4E",
    },
  
    mealDetail: {
      fontSize: 14,
      color: "#2C4B4E",
    },
  
    checkBoxContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    buttonContainer: {
      marginBottom: 85,
    },
    addButton: {
      backgroundColor: "#00AD71",
      padding: 15,
      borderRadius: 8,
      alignItems: "center",
    },
    addButtonText: {
      color: "#fff",
      fontSize: 20,
      fontWeight: "bold",
    },
    bottomNavigation: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10,
      backgroundColor: "#fff",
      position: "absolute",
      bottom: 0,
      width: "100%",
      borderTopWidth: 1,
      borderTopColor: "#ddd",
    },
    logo: {
      width: 50,
      height: 50,
    },
    checkbox: {
      margin: 8,
      color:"#24B77F",
  },
  deleteButton: {
    // add styles for the delete button here
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    fontSize: 10,
    color: '#fff',
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
}); 

export default styles;