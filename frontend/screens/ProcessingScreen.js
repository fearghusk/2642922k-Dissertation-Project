import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

export default function ProcessingScreen({ route }) {
  const message =
    route?.params?.message || "Processing your sheet music...";

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4B5563" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F9FAFB",
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: "#111827",
    textAlign: "center",
  },
});
