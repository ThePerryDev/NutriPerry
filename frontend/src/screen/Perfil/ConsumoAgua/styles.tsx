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
  imagecontainer: {
    alignItems: "center",
    marginTop:50,
  },
  image: {
    width:330,
    height: 300,
    resizeMode: "contain",
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
  buttoncontainer:{
    flexDirection:"row",
    justifyContent:"space-between"
  },
  dietbutton:{
    justifyContent:"center",
    alignItems:"center",
    width:150,
    height:50,
    backgroundColor:"#00AD71",
    borderRadius: 15,
    marginTop:30
  },
  dietwaterbutton:{
    justifyContent:"center",
    alignItems:"center",
    height:50,
    backgroundColor:"#00AD71",
    borderRadius: 15,
    marginTop:30
  },
  diettext:{
    color:"#ffffff",
    fontSize:20,
    fontWeight:"bold"
  }
});

export default styles;