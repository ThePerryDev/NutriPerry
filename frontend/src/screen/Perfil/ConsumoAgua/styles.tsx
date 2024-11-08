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
  explanation: {
    fontSize: 20,
    fontWeight:"bold",
    textAlign: "center",
    color: "#2C4B4E",
    marginBottom:25
  },
  buttonsplit:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-evenly",
    marginBottom: 25,
  },
  infocontainer:{
    backgroundColor:"#f5f5f5",
    marginBottom:25,
    borderRadius:15
  },
  infotitle: {
    fontSize: 18,
    fontWeight:"bold",
    textAlign: "center",
    color: "#2C4B4E",
    marginTop:15,
    marginBottom:15
  },
  infosplit:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-evenly",
    marginBottom: 25,
  },
  infosubtitle: {
    fontSize: 16,
    fontWeight:"bold",
    textAlign: "center",
    color: "#2C4B4E",
    marginBottom:10
  },
  infodata: {
    fontSize: 16,
    fontWeight:"bold",
    textAlign: "center",
    color: "#2C4B4E",
  },
  chartContainer:{
    paddingRight:10,
    paddingLeft:10,
    paddingBottom:15,
    backgroundColor:"#f5f5f5",
    borderRadius:15,
    justifyContent:"center",
    alignItems:"center",
    alignContent:"center",
  },
  charttitle:{
    color:"#2C4B4E",
    fontSize:18,
    fontWeight:"bold",
    paddingTop:15,
    paddingBottom:25
  },
  selectButtonText: {
    fontSize:16,
    fontWeight:"bold",
    color:"#2C4B4E",
  },
  activeText: {
    color: "#00AD71", // Cor para o texto ativo
  },
  
});

export default styles;