import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function ResultScreen({ route }) {
  const text = route.params?.text || "No summary generated.";

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Music Summary</Text>
      <Text style={styles.body}>{text}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  body: { fontSize: 16, lineHeight: 22 },
});
