import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBFBFB',
        width: '100%',
        height: '100%',
        paddingTop: Constants.statusBarHeight
    },

    cima: {
        width: '100%',
        flexDirection: "row",
        marginTop: '10%'
    },

    titulo: {
        fontSize: 28,
        color: '#2C4B4E',
        fontWeight: "bold",
        marginLeft: 50
    },

    conteudo: {
        flex: 1,
        width: '100%',
        marginHorizontal: 20
    },

    viewAdendo: {
        width: '100%',
        flexDirection: "column",
        alignItems: "center",
    },

    volta: {
        marginLeft: 25
    },

    buttonSalvar: {
        height: 50,
        width: 330,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#00AD71",
        borderRadius: 15,
        marginLeft: -5,
        marginTop: "50%"
    },

    subtitulo: {
        color: "#2C4B4E",
        fontSize: 20,
        marginTop: 20,
        marginHorizontal: 55,
        textAlign: 'center'
    },

    texto: {
        color: "#2C4B4E",
        fontSize: 20,
        marginTop: 20
    },

    input: {
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        height: 40,
        width: 320,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "#00AD71",
        marginTop: 10
      },
});

export default styles;