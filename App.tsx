import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  Image,
  Alert,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Video, ResizeMode } from "expo-av";
import { formatDuration } from "./utils/formatDuration";

export default function App() {
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [videoInfo, setVideoInfo] = useState<{
    name: string;
    duration: number;
    size?: number;
  } | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const status = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(status.granted);

      const storedUri = await AsyncStorage.getItem("videoURI");
      if (storedUri) {
        setVideoUri(storedUri);
      }
    })();
  }, []);

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
    });

    if (!result.canceled && result.assets[0].uri) {
      const video = result.assets[0];
      const fileSizeMB = (video.fileSize ?? 0) / 1024 / 1024;

      if (fileSizeMB > 50) {
        Alert.alert("File too large", "Please select a video under 50MB.");
        return;
      }

      setVideoUri(video.uri);
      setVideoInfo({
        name: video.fileName ?? "Unknown",
        duration: video.duration ?? 0,
        size: video.fileSize,
      });

      await AsyncStorage.setItem("videoURI", video.uri);
    }
  };

  const handleSubmit = async () => {
    if (videoUri) {
      const data = { videoUri, title, description };
      await AsyncStorage.setItem("videoData", JSON.stringify(data));
      Alert.alert("Saved", "Video data has been saved.");
    }
  };

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Permission Required</Text>
        <Text style={styles.errorSubText}>
          Please enable media library permissions in settings.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {videoUri ? (
        <>
          <Video
            source={{ uri: videoUri }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            style={styles.video}
          />
          <Button title="Change Video" onPress={pickVideo} />

          {videoInfo && (
            <View style={styles.infoContainer}>
              <Text>File: {videoInfo.name}</Text>
              <Text>Duration: {formatDuration(videoInfo.duration)}</Text>
              <Text>Size: {(videoInfo.size! / 1024 / 1024).toFixed(2)} MB</Text>
            </View>
          )}

          <TextInput
            placeholder="Enter Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <TextInput
            placeholder="Enter Description"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
          />
          <Button title="Submit" onPress={handleSubmit} />
        </>
      ) : (
        <>
          <Image
            source={require("./assets/placeholder.png")}
            style={styles.placeholderImage}
          />
          <Button title="Select Video" onPress={pickVideo} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#dc2626",
  },
  errorSubText: {
    textAlign: "center",
    marginTop: 8,
  },
  video: {
    width: "100%",
    height: 250,
    marginBottom: 16,
  },
  infoContainer: {
    marginVertical: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginVertical: 8,
    width: "100%",
  },
  placeholderImage: {
    width: 200,
    height: 200,
  },
});
