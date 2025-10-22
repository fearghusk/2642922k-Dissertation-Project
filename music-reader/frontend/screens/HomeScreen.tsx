import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

export default function HomeScreen() {
  const [fileInfo, setFileInfo] = useState(null);

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setFileInfo(result.assets[0]);
      Alert.alert("Photo taken", "You took a new photo.");
    }
  };

  const pickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setFileInfo(result.assets[0]);
      Alert.alert("Photo selected", "You picked a photo from gallery.");
    }
  };

  const pickXML = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["application/xml", "text/xml", "text/plain"],
    });
    if (result.type === "success") {
      setFileInfo(result);
      Alert.alert("XML selected", `You picked: ${result.name}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to Music Reader</Text>
      <Text style={styles.subtitle}>
        Choose how you want to input your sheet music:
      </Text>

      <View style={styles.buttonContainer}>
        <Button title="📷 Take a Photo" onPress={takePhoto} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="🖼️ Upload Photo" onPress={pickPhoto} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="📄 Upload MusicXML File" onPress={pickXML} />
      </View>

      {fileInfo && (
        <View style={{ marginTop: 30 }}>
          <Text style={{ fontSize: 16 }}>
            Selected: {fileInfo.name || "Photo"}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 30, textAlign: "center" },
  buttonContainer: { width: "80%", marginVertical: 10 },
});
