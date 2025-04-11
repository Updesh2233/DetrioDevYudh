import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  datacontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },

  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  box: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    position: "absolute",
    top: "80%",
    right: "40%",
    backgroundColor: "grey",
    borderRadius: 70,
    padding: 10,
  },
  scannerButton: {},
  cartContainer: { width: "90%", marginTop: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 2,

  },
  image: { width: 60, height: 60, borderRadius: 5, marginRight: 10 },
  itemDetails: { flex: 1, justifyContent: "center" },
  name: { fontSize: 16, fontWeight: "bold" },
  price: { fontSize: 14, color: "gray" },
  summary: {
    padding: 10,
    backgroundColor: "#ffecb3",
    borderRadius: 8,
    marginTop: 10,
    paddingLeft: 30
  },
  summaryText: { fontSize: 16 },
  finalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d32f2f",
    marginTop: 5,
  },
});
