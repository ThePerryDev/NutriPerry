import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBFBFB',
        padding:50
    },

    cima: {
        flexDirection: 'row',
    },

    volta: {
        marginRight: 250
    },

    image: {
        height: 270,
        width: 290
    },

    textgeral: {
        marginTop: 55,
        marginBottom: 7,
        fontSize: 20,
        fontWeight:"semibold",
        color: "#2C4B4E",
    },

    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        height: 68,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#00AD71'
    },

    button: {
        height: 68,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        backgroundColor: '#00AD71',
        borderRadius: 25
    },

});

export default styles;