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
    backgroundColor: "#24B77F",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },

  totalText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 60,
    fontWeight: "bold",
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  stats: {
    alignItems: "center",
  },

  statLabel: {
    color: "#fff",
    fontSize: 16,
  },

  statValue: {
    color: "#fff",
    fontSize: 14,
  },

  chart: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  totalCalories: {
    color: "#24B77F",
    fontWeight: "bold",
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
    color: "#2C4B4E",
  },

  mealName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C4B4E",
  },

  mealDetail: {
    fontSize: 14,
    color: "#2C4B4E",
  },
  logo: {
    width: 50,
    height: 50,
  },
});

export default styles;