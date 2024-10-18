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
    input_login: {
      margin: 20,
      width: 300,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 3,
      borderColor: '#00AD71',
      borderRadius: 25,
      paddingVertical: 5,
      paddingHorizontal: 20,
      backgroundColor: '#fff',
    },
    icon: {
      width: 30,
      height: 30,
      marginRight: 8, // Espaçamento entre o ícone e o campo de input
    },
    input: {
      flex: 1, // Permite que o input ocupe o espaço restante
      paddingVertical: 8,
      paddingHorizontal: 5,
    },
    button: {
        height: 68,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        backgroundColor: '#00AD71',
        borderRadius: 25
    }
  });

  export default styles;