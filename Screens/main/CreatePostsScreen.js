import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { formStyles } from "../Styles";

import contentImage from "../image/content-img.png";
import camera from "../image/camera.png";
import navIcon from "../image/nav-icon.png";

export default function NewPostScreen() {
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);

  const handleImageUploaded = () => {
    // uploaded img
    setIsImageUploaded(true);
    setIsButtonActive(true);
  };

  return (
    <View style={styles.container}>
      {isImageUploaded ? (
        <View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} />
            <TouchableOpacity onPress={handleImageUploaded}>
              <Image source={camera} style={styles.cameraIcon} />
            </TouchableOpacity>
          </View>
          <Text
            style={[{ color: "#BDBDBD", marginTop: 8 }, formStyles.mainText]}
          >
            Редагувати фото
          </Text>
        </View>
      ) : (
        <View>
          <Image source={contentImage} style={styles.image} />
          <TouchableOpacity onPress={handleImageUploaded}>
            <Image source={camera} style={styles.cameraIcon} />
          </TouchableOpacity>
          <Text
            style={[{ color: "#BDBDBD", marginTop: 8 }, formStyles.mainText]}
          >
            Завантажте фото
          </Text>
        </View>
      )}
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
            onChangeText={(text) => setLocation(text)}
          />
        </View>
      </View>
      <TouchableOpacity
        // style={{ backgroundColor: isButtonActive ? "green" : "gray" }}
        style={
          isButtonActive
            ? formStyles.button
            : {
                ...formStyles.button,
                backgroundColor: "#F6F6F6",
              }
        }
        disabled={!isButtonActive}
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
  },
  image: {
    width: 343,
    height: 240,
    marginTop: 32,
  },
  cameraIcon: {
    position: "absolute",
    top: -145,
    left: 145,
    width: 60,
    height: 60,
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
