import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Food Analyzer</Text>
      <Text style={styles.subtitle}>Select a food to view its health breakdown</Text>

      <Link href="/food-selection" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Select Food</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: "center", alignItems: "center",
    backgroundColor: "#fafafa", paddingHorizontal: 20
  },
  title: {
    fontSize: 32, fontWeight: "800", marginBottom: 10, color: "#333"
  },
  subtitle: {
    fontSize: 16, marginBottom: 40, color: "#666", textAlign: "center"
  },
  button: {
    backgroundColor: "#4CAF50", paddingVertical: 14,
    paddingHorizontal: 26, borderRadius: 14, width: "80%",
    alignItems: "center"
  },
  buttonText: {
    color: "white", fontSize: 18, fontWeight: "700"
  }
});
