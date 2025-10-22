import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

export default function HomeScreen({ navigation }) {
  const [fileInfo, setFileInfo] = useState(null);

  // Take a new photo with camera
  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setFileInfo(result.assets[0]);
      Alert.alert("Photo selected", "You took a new photo.");
      // navigation.navigate("Processing", { uri: result.assets[0].uri });
    }
  };

  // Choose photo from gallery
  const pickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setFileInfo(result.assets[0]);
      Alert.alert("Photo selected", "You chose an image from your gallery.");
      // navigation.navigate("Processing", { uri: result.assets[0].uri });
    }
  };

  // Upload an existing MusicXML file
  const pickXML = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["application/xml", "text/xml", "text/plain"],
    });
    if (result.type === "success") {
      setFileInfo(result);
      Alert.alert("File selected", `You uploaded: ${result.name}`);
      // navigation.navigate("Processing", { uri: result.uri });
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
          <Text style={{ fontSize: 16 }}>Selected: {fileInfo.name || "photo"}</Text>
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
    backgroundColor: "#fff",
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
  },
  buttonContainer: {
    width: "80%",
    marginVertical: 10,
  },
});
