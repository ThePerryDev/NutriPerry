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
        flex: 1,
        width: '100%',
        height: 10,
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
    },

    volta: {
        marginLeft: 25
    },

    button: {
        height: 50,
        width: 330,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF725E",
        borderRadius: 15,
    },
});

export default styles;