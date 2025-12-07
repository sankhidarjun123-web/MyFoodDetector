import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    FlatList,
    ListRenderItem,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import foods from "../data/food.json";

// Define the shape of each food item
type Food = {
  id: number;
  name: string;
  category: string;
};

// Convert imported JSON to typed array
const foodList: Food[] = foods as Food[];

export default function FoodSelection() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  // Search logic
  const filteredFoods = foodList.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  // RENDER EACH CARD
  const renderItem: ListRenderItem<Food> = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/food-item?name=${item.name}`)}
    >
      {/* IMAGE PLACEHOLDER (square) */}
      <View style={styles.imagePlaceholder} />

      {/* FOOD NAME */}
      <Text style={styles.foodName} numberOfLines={1}>
        {item.name}
      </Text>

      {/* CATEGORY */}
      <Text style={styles.category}>{item.category}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* SEARCH BAR */}
      <View style={styles.searchRow}>
        <TextInput
          style={styles.search}
          placeholder="Search food..."
          placeholderTextColor="#999"
          value={query}
          onChangeText={setQuery}
        />

        {/* CAMERA ICON → camera.tsx */}
        <TouchableOpacity onPress={() => router.push("/camera")}>
          <Ionicons name="camera" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* NO RESULTS */}
      {filteredFoods.length === 0 && (
        <Text style={styles.noResults}>No food item found</Text>
      )}

      {/* 4-COLUMN GRID */}
      <FlatList
        data={filteredFoods}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={4}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    backgroundColor: "#fff",
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  search: {
    flex: 1,
    height: 45,
    backgroundColor: "#f7f7f7",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginRight: 10,
    fontSize: 15,
  },

  row: {
    justifyContent: "space-between",
    marginBottom: 12,
  },

  card: {
    width: "23%", // four cards fit in one row
    backgroundColor: "#f8f8f8",
    padding: 6,
    borderRadius: 10,
    alignItems: "center",
    elevation: 2,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },

  imagePlaceholder: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginBottom: 6,
  },

  foodName: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },

  category: {
    fontSize: 10,
    color: "#777",
    textAlign: "center",
  },

  noResults: {
    textAlign: "center",
    color: "#d00",
    marginTop: 10,
    fontSize: 16,
  },
});
