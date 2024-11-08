import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#00AD71"
  },
  headerContainer: {
    alignItems: "center",
    width: 315,
    paddingHorizontal: 20,
    marginBottom: 70,
    marginTop:30
  },
  headerlabel:{
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff",
    alignItems: "flex-end"
  },
  imagecontainer: {
    alignItems: "center",
    marginTop:30,
    marginBottom: 30,
  },
  image: {
    width: 280,
    height: 242,
    resizeMode: "contain",
  },
  buttoncontainer: {
    marginTop: 70,
  },
  arrowContainer: {
    padding: 10, // Ajuste de padding para tornar o botão mais fácil de tocar
  },
  arrow: {
    width: 24, // Certifique-se de definir largura e altura para a seta
    height: 24,
    resizeMode: "contain",
  }
});

export default styles;