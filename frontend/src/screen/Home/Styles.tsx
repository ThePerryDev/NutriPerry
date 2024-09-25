import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  header: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },

  card: {
    height: 120,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },

  mealItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },

  mealInfo: {
    flex: 1,
    marginLeft: 10,
  },

  mealName: {
    fontSize: 16,
    fontWeight: "bold",
  },

  mealDetail: {
    fontSize: 14,
    color: "#888",
  },
});

export default styles;
