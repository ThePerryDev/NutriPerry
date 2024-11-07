import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  pageContainer: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },

  scrollContent: {
    flexGrow: 1,
    marginBottom: 80,
  },

  header: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },

  card: {
    backgroundColor: "#24B77F",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    marginHorizontal: 10, // Adicione margens nas laterais
    // width: '90%', // Ou defina uma largura fixa se preferir
  },

  totalText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    
  },

  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    
  },

  progressInfo: {
    marginLeft: 15,
  },

  detailText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
  },
  checkbox: {
    margin: 8,
    color:"#24B77F",
  },
});

export default styles;
