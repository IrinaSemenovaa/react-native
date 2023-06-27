import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

import { formStyles } from "../Styles";

import camera from "../image/camera.png";
import navIcon from "../image/nav-icon.png";

export default function NewPostScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationInfo, setLocationInfo] = useState("");
  const [title, setTitle] = useState("");

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
        console.log("Местоположение не найдено");
      }
    } catch (error) {
      console.log("Ошибка при геокодировании:", error);
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

  const handlePublish = () => {
    console.log("Location:", location);
    navigation.navigate("PostsScreen", { photo, title, locationInfo });
  };

  const handleCameraPress = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      setPhoto(uri);
      setIsButtonActive(true);

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
          {photo && (
            <View>
              <Image
                style={styles.photoContainer}
                source={{ uri: photo }}
                resizeMode="contain"
              />
            </View>
          )}
          <TouchableOpacity onPress={handleCameraPress}>
            <Image source={camera} style={styles.cameraIcon} />
          </TouchableOpacity>
        </Camera>
        <Text style={[{ color: "#BDBDBD", marginTop: 8 }, formStyles.mainText]}>
          Завантажте фото
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
    width: 16,
    height: 18,
    marginBottom: 15,
  },
});
