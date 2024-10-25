import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
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
        flexDirection: "column",
        alignItems: "center",
    },

    volta: {
        marginLeft: 25
    },

    buttonLogout: {
        height: 50,
        width: 330,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF725E",
        borderRadius: 15,
        marginTop: '20%'
    },

    buttonInformacoes: {
        marginTop: "15%",
        height: 50,
        width: 330,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F5F5F5",
        borderRadius: 15,
    },

    buttonOutros: {
        marginTop: "10%",
        height: 50,
        width: 330,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F5F5F5",
        borderRadius: 15,
    },

    textoButton: {
        color: "#2C4B4E",
        fontSize: 20,
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

    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: 5,
        marginRight: 60,
        marginBottom: 15,
        marginTop: 30,
      },
});

export default styles;