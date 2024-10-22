import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  pageContainer: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
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
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  progressInfo: {
    marginLeft: 15,
  },

  detailText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
  },
});

export default styles;
