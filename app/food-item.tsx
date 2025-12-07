import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import foods from "../data/food.json";

type AyurvedaInfo = {
  vataEffect: string;
  pittaEffect: string;
  kaphaEffect: string;
  thermalNature: string;
  bestTimeToEat: string;
};

type FoodItem = {
  id: number;
  name: string;
  category: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fats_g: number;
  fibre_g: number;
  ayurveda: AyurvedaInfo;
};

const typedFoods = foods as FoodItem[];

export default function FoodItemScreen() {
  const params = useLocalSearchParams<{ name?: string }>();
  const nameParam = params.name;

  const decodedName =
    typeof nameParam === "string" ? decodeURIComponent(nameParam) : undefined;

  const food = typedFoods.find((f) => f.name === decodedName);

  if (!food) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Food item not found</Text>
        <Text style={styles.errorText}>
          Go back to the food list and select an item again.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* GREEN HEADER */}
      <LinearGradient colors={["#4CAF50", "#2E7D32"]} style={styles.header}>
        <Text style={styles.headerTitle}>{food.name}</Text>
        <Text style={styles.headerSubtitle}>{food.category} dish</Text>
      </LinearGradient>

      {/* CALORIES – RED */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Calories</Text>
        <Text style={styles.calorieText}>{food.calories} kcal</Text>
      </View>

      {/* MACRO BREAKDOWN – DARK YELLOW */}
      <View style={styles.cardYellow}>
        <Text style={styles.sectionTitle}>Macro Breakdown</Text>

        {[
          ["Protein", food.protein_g],
          ["Carbs", food.carbs_g],
          ["Fats", food.fats_g],
          ["Fibre", food.fibre_g],
        ].map(([label, value]) => (
          <View key={label as string} style={styles.macroRow}>
            <Text style={styles.macroLabel}>{label}</Text>
            <Text style={styles.macroValue}>{value}g</Text>

            <View style={styles.progress}>
              {/* multiply a bit so small grams still show some bar */}
              <View
                style={[
                  styles.progressFillYellow,
                  { width: `${Math.min(Number(value) * 3, 100)}%` },
                ]}
              />
            </View>
          </View>
        ))}
      </View>

      {/* AYURVEDA IMPACT – DARK YELLOW */}
      <View style={styles.cardYellow}>
        <Text style={styles.sectionTitle}>Ayurveda Impact</Text>

        <Text style={styles.ayurText}>
          <Text style={styles.ayurLabel}>Vata: </Text>
          {food.ayurveda.vataEffect}
        </Text>
        <Text style={styles.ayurText}>
          <Text style={styles.ayurLabel}>Pitta: </Text>
          {food.ayurveda.pittaEffect}
        </Text>
        <Text style={styles.ayurText}>
          <Text style={styles.ayurLabel}>Kapha: </Text>
          {food.ayurveda.kaphaEffect}
        </Text>
        <Text style={styles.ayurText}>
          <Text style={styles.ayurLabel}>Thermal Nature: </Text>
          {food.ayurveda.thermalNature}
        </Text>
        <Text style={styles.ayurText}>
          <Text style={styles.ayurLabel}>Best Time To Eat: </Text>
          {food.ayurveda.bestTimeToEat}
        </Text>
      </View>

      {/* BODY TYPE COMPATIBILITY – LIGHT RED */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Body Type Compatibility</Text>

        {["Vata", "Pitta", "Kapha"].map((type) => (
          <View key={type} style={{ marginBottom: 12 }}>
            <Text style={styles.bodyTypeLabel}>{type}</Text>
            <View style={styles.btProgressRed}>
              <LinearGradient
                colors={["#FF8A80", "#FF5252"]}
                style={[styles.btFillRed, { width: "70%" }]} // static bar, visually nice
              />
            </View>
          </View>
        ))}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9fb",
  },

  // HEADER
  header: {
    paddingVertical: 70,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: "white",
  },
  headerSubtitle: {
    fontSize: 16,
    marginTop: 6,
    color: "rgba(255,255,255,0.9)",
  },

  // CARDS
  card: {
    backgroundColor: "white",
    marginHorizontal: 18,
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 4,
  },
  cardYellow: {
    backgroundColor: "#FFF3CD", // dark-ish yellow theme
    marginHorizontal: 18,
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 4,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#222",
  },

  // CALORIES – RED
  calorieText: {
    fontSize: 32,
    fontWeight: "800",
    color: "#D32F2F",
  },

  // MACRO SECTION
  macroRow: {
    marginBottom: 14,
  },
  macroLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
  },
  macroValue: {
    position: "absolute",
    right: 0,
    top: 0,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  progress: {
    height: 8,
    backgroundColor: "#e5e5e5",
    borderRadius: 6,
    marginTop: 4,
    overflow: "hidden",
  },
  progressFillYellow: {
    height: "100%",
    backgroundColor: "#D6A400",
  },

  // AYURVEDA TEXT
  ayurText: {
    fontSize: 14,
    marginBottom: 6,
    color: "#444",
    lineHeight: 20,
  },
  ayurLabel: {
    fontWeight: "700",
    color: "#333",
  },

  // BODY TYPE – LIGHT RED
  bodyTypeLabel: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: "700",
    color: "#444",
  },
  btProgressRed: {
    height: 12,
    borderRadius: 10,
    backgroundColor: "#FFCDD2",
    overflow: "hidden",
  },
  btFillRed: {
    height: "100%",
    borderRadius: 10,
  },

  // ERROR STATE
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
