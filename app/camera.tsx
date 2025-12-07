import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CameraScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null);

  const [photoUri, setPhotoUri] = useState<string | null>(null);

  // While permission is loading
  if (!permission) return <View />;

  // Permission not granted yet
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Camera access is required</Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    try {
      if (!cameraRef.current) return;
      const result = await cameraRef.current.takePictureAsync();
      setPhotoUri(result.uri);
    } catch (e) {
      console.log("Error taking picture:", e);
    }
  };

  // After photo is taken → show only image + Go Back
  if (photoUri) {
    return (
      <View style={styles.previewContainer}>
        <Image source={{ uri: photoUri }} style={styles.previewImage} />

        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => router.back()}
        >
          <Text style={styles.goBackText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // CAMERA VIEW
  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back" // "front" or "back"
      />

      <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
        <Ionicons name="camera" size={36} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  camera: {
    flex: 1,
  },

  // Permission UI
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  permissionText: {
    fontSize: 18,
    marginBottom: 20,
    color: "#333",
  },
  permissionButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  permissionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },

  // Capture button
  captureButton: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "#00000099",
    padding: 20,
    borderRadius: 50,
  },

  // Preview screen
  previewContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    width: "100%",
    height: "80%",
    resizeMode: "contain",
  },
  goBackButton: {
    marginTop: 20,
    backgroundColor: "#FF5252",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  goBackText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
});
