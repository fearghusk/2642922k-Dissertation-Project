import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { useNavigation } from "@react-navigation/native";

const BACKEND_URL = "https://aracelis-ungesticulative-ashlie.ngrok-free.dev/upload";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [fileInfo, setFileInfo] = useState(null);
  const [processing, setProcessing] = useState(false);

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setFileInfo(result.assets[0]);
      await processFile(result.assets[0]);
    }
  };

  const pickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setFileInfo(result.assets[0]);
      await processFile(result.assets[0]);
    }
  };

  const pickXML = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["application/xml", "text/xml", "text/plain"],
    });
    if (result.type === "success") {
      setFileInfo(result);
      await processFile(result);
    }
  };

  const processFile = async (file) => {
    try {
      setProcessing(true);
      navigation.navigate("Processing", { message: "Reading sheet music..." });
  
      const formData = new FormData();
      formData.append("file", {
        uri: file.uri,
        name: file.name || "sheet.png",
        type: file.mimeType || "image/png",
      });
  
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        body: formData,
      });
  
      const json = await response.json();
  
      navigation.goBack();
  
      if (!json.success) throw new Error(json.error || "Unknown error");
  
      // Display summary to user
      navigation.navigate("Result", { text: json.result });
  
    } catch (error) {
      navigation.goBack();
      Alert.alert("Error", error.message || "File processing failed.");
    } finally {
      setProcessing(false);
    }
  };
  

  if (processing) {
    return (
      <View style={styles.processingContainer}>
        <ActivityIndicator size="large" color="#4B5563" />
        <Text style={styles.processingText}>Processing your file...</Text>
      </View>
    );
  }

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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 30, textAlign: "center" },
  buttonContainer: { width: "80%", marginVertical: 10 },
  processingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F9FAFB",
  },
  processingText: {
    marginTop: 20,
    fontSize: 16,
    color: "#111827",
    textAlign: "center",
  },
});
