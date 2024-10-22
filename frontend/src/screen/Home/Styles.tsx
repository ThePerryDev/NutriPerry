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
    marginBottom: 10,
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

  // Estilos para o modal
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo semitransparente
  },

  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
    backgroundColor: "#ccc",
    borderRadius: 20,
  },
});

export default styles;
