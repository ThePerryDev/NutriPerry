import { StyleSheet } from "react-native";
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBFBFB',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
 
    cima: {
        flexDirection: 'row',
    },
 
    volta: {
        marginRight: 250
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
 
    textgeral: {
        marginTop: 55,
        marginBottom: 7,
        marginLeft: -130,
        fontSize: 20
    },
 
    image: {
        height: 270,
        width: 290
    },
 
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        height: 68,
        width: 300,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#00AD71'
    }
});
 
export default styles;