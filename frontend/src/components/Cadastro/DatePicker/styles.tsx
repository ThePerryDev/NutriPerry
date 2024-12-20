import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent:"center",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textgeral: {
    fontSize: 18,
    color: "#2C4B4E",
    fontWeight: "bold",
    marginBottom: 5,
  },
  dateText: {
    fontSize: 16,
    color: "#2C4B4E",
    textAlign: "center",
    backgroundColor: "#ffffff",
    textAlignVertical:"center",
  },

  dateBox: {
    width: 185,
    height: 35,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#00AD71",
    borderRadius: 15,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },

  dateLabel: {
    fontSize: 18,
    color: "#2C4B4E",
    fontWeight: "bold",
    marginRight: 60,
  },
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
});

export default styles;
