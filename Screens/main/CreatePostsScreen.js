import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

import { formStyles } from "../Styles";

import { Feather } from "@expo/vector-icons";
import camera from "../image/camera.png";
import transpCamera from "../image/transpCamera.png";
import navIcon from "../image/nav-icon.png";

import { db, storage } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

export default function NewPostScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isPhotoTaken, setIsPhotoTaken] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationInfo, setLocationInfo] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [title, setTitle] = useState("");

   const user = useSelector((state) => state.auth.user);

  const resetState = () => {
    setPhotoURL(null);
    setIsButtonActive(false);
    setIsPhotoTaken(false);
    setLocation(null);
    setLocationInfo("");
    setLatitude(null);
    setLongitude(null);
    setTitle("");
  };

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const geocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      if (geocode.length > 0) {
        const { city, country } = geocode[0];
        setLocationInfo(`${city}, ${country}`);
      } else {
        console.log("Location not found");
      }
    } catch (error) {
      console.log("Geocoding error:", error);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");

      let { status: locationStatus } =
        await Location.requestForegroundPermissionsAsync();
      if (locationStatus === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        reverseGeocode(location.coords.latitude, location.coords.longitude);
      } else {
        console.log("Permission to access location denied");
      }
    })();
  }, []);

  const handlePublish = async () => {
    try {
      const downloadURL = await uploadPhotoToServer();

      const postId = await uploadPostToServer(downloadURL);

      console.log("Download URL:", downloadURL);
      console.log("Post Id:", postId);

      navigation.navigate("PostsScreen", {
        photoURL,
        title,
        locationInfo,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        postId,
      });

      resetState();
    } catch (error) {
      console.error("Error handling publish:", error);
    }
  };

  const uploadPhotoToServer = async () => {
    try {
      console.log("User ID before adding post:", user.id);
      console.log("User Name before adding post:", user.name);

      const response = await fetch(photoURL);
      const file = await response.blob();

      const uniquePostId = Date.now().toString();

      const storageRef = ref(storage, `postImage/${uniquePostId}`);
      const uploadTask = uploadBytes(storageRef, file);

      const snapshot = await uploadTask;

      const downloadURL = await getDownloadURL(snapshot.ref);

      console.log("Photo successfully uploaded to the server");
      return downloadURL;
    } catch (error) {
      console.error("Error uploading photo to server:", error);
      throw error;
    }
  };

  const uploadPostToServer = async (downloadURL) => {
    try {
      const newPost = {
        photoURL: downloadURL,
        title,
        locationInfo,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        timestamp: serverTimestamp(),
        userName: user.name,
        userId: user.id,
        userPhoto: user.photo,
      };

      const docRef = await addDoc(collection(db, "posts"), newPost);

      const postId = docRef.id;
      await updateDoc(docRef, { postId });

      console.log(
        "Post successfully uploaded to Firestore with ID:",
        docRef.id
      );
      return docRef.id;
    } catch (error) {
      console.error("Error loading post in Firestore:", error);
      throw error;
    }
  };

  const handleCameraPress = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      setPhotoURL(uri);
      setIsButtonActive(true);
      setIsPhotoTaken(true);

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        reverseGeocode(location.coords.latitude, location.coords.longitude);
      } else {
        console.log("Permission to access location denied");
      }
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View>
        <Camera style={styles.imageContainer} ref={setCameraRef}>
          {photoURL && (
            <View>
              <Image
                style={styles.photoContainer}
                source={{ uri: photoURL }}
                resizeMode="contain"
              />
            </View>
          )}
          <TouchableOpacity onPress={handleCameraPress}>
            {isPhotoTaken ? (
              <Image source={transpCamera} style={styles.cameraIcon} />
            ) : (
              <Image source={camera} style={styles.cameraIcon} />
            )}
          </TouchableOpacity>
        </Camera>
        <Text style={[{ color: "#BDBDBD", marginTop: 8 }, formStyles.mainText]}>
          {isPhotoTaken ? "Редагувати фото" : "Завантажте фото"}
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, formStyles.mainText]}
          placeholder="Назва..."
          onChangeText={(text) => setTitle(text)}
        />
        <View style={styles.locationContainer}>
          <Image source={navIcon} style={styles.locationIcon} />
          <TextInput
            style={[styles.input, formStyles.mainText]}
            placeholder="Місцевість..."
            value={locationInfo}
            editable={false}
          />
        </View>
      </View>
      <TouchableOpacity
        style={
          isButtonActive
            ? formStyles.button
            : {
                ...formStyles.button,
                backgroundColor: "#F6F6F6",
              }
        }
        disabled={!isButtonActive}
        onPress={handlePublish}
      >
        <Text
          style={
            isButtonActive
              ? formStyles.buttonText
              : { ...formStyles.buttonText, color: "#BDBDBD" }
          }
        >
          Опублікувати
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={resetState}>
        <View
          style={{
            width: 70,
            height: 40,
            borderRadius: 20,
            marginTop: 135,
            backgroundColor: "#F6F6F6",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Feather name="trash-2" size={24} color="#BDBDBD" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  imageContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: 343,
    height: 240,
    marginTop: 32,
    borderRadius: 8,
  },
  cameraIcon: {
    width: 60,
    height: 60,
  },
  photoContainer: {
    position: "absolute",
    top: -90,
    left: -172,
    width: 343,
    height: 240,
    borderRadius: 8,
  },
  inputContainer: {
    alignSelf: "flex-start",
    width: "100%",
    paddingVertical: 32,
    paddingHorizontal: 25,
  },
  input: {
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    paddingBottom: 15,
    paddingLeft: 8,
    width: "100%",
  },
  locationContainer: {
    marginTop: 32,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },
  locationIcon: {
    width: 24,
    height: 24,
    marginBottom: 15,
  },
});
