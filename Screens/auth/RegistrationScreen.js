import React, { useState } from "react";
import {
  TouchableOpacity,
  TextInput,
  Text,
  View,
  Image,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";

import {
  registerUser,
  uploadAvatarToStorage,
} from "../redux/auth/authOperations";

import { BackgroundContainer } from "../BackgroundContainer";
import { formStyles } from "../Styles";

import avatarImage from "../image/defAvatar.png";
import { AntDesign } from "@expo/vector-icons";
import deleteAvatar from "../image/deleteAvatar.png";

const initialState = {
  nickname: "",
  email: "",
  password: "",
  avatar: null,
};

export default function RegistrationScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isNicknameFocused, setIsNicknameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const response = await fetch(result.uri);
      const blob = await response.blob();

      const avatarURL = await uploadAvatarToStorage(blob);
      console.log("Inside handleImagePicker: ", avatarURL);

      setState((prevState) => ({
        ...prevState,
        avatar: avatarURL,
      }));
    }
  };

  const handleRegistration = async () => {
    try {
      if (state.photo) {
        dispatch(registerUser({ ...state }));
      } else {
        dispatch(registerUser(state));
      }

      setState(initialState);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <BackgroundContainer>
      <View
        style={[
          {
            ...formStyles.formContainer,
            marginBottom: isShowKeyboard ? -200 : 0,
          },
          styles.registationContainer,
        ]}
      >
        <View style={styles.avatarContainer}>
          {state.avatar ? (
            <Image source={{ uri: state.avatar }} style={styles.avatar} />
          ) : (
            <Image source={avatarImage} style={styles.avatar} />
          )}
          {state.avatar ? (
            <TouchableOpacity
              onPress={() => {
                setState({ ...state, avatar: null });
              }}
              style={styles.plusContainer}
            >
              <Image source={deleteAvatar} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleImagePicker}
              style={styles.plusContainer}
            >
              <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
            </TouchableOpacity>
          )}
        </View>
        <Text style={formStyles.title}>Реєстрація</Text>
        <TextInput
          style={[
            formStyles.mainText,
            formStyles.input,
            isNicknameFocused ? formStyles.inputFocused : null,
          ]}
          placeholder="Логін"
          onFocus={() => {
            setIsShowKeyboard(true);
            setIsNicknameFocused(true);
          }}
          onBlur={() => {
            setIsShowKeyboard(false);
            setIsNicknameFocused(false);
          }}
          value={state.nickname}
          onChangeText={(value) =>
            setState((prevState) => ({ ...prevState, nickname: value }))
          }
        />
        <TextInput
          style={[
            formStyles.mainText,
            formStyles.input,
            isEmailFocused ? formStyles.inputFocused : null,
          ]}
          placeholder="Адреса електронної пошти"
          onFocus={() => {
            setIsShowKeyboard(true);
            setIsEmailFocused(true);
          }}
          onBlur={() => {
            setIsShowKeyboard(false);
            setIsEmailFocused(false);
          }}
          value={state.email}
          onChangeText={(value) =>
            setState((prevState) => ({ ...prevState, email: value }))
          }
        />
        <TextInput
          style={[
            formStyles.mainText,
            formStyles.input,
            formStyles.lastInput,
            isPasswordFocused ? formStyles.inputFocused : null,
          ]}
          placeholder="Пароль"
          secureTextEntry={true}
          onFocus={() => {
            setIsShowKeyboard(true);
            setIsPasswordFocused(true);
          }}
          onBlur={() => {
            setIsShowKeyboard(false);
            setIsPasswordFocused(false);
          }}
          value={state.password}
          onChangeText={(value) =>
            setState((prevState) => ({ ...prevState, password: value }))
          }
        />
        <TouchableOpacity
          style={formStyles.button}
          onPress={handleRegistration}
        >
          <Text style={[formStyles.buttonText, formStyles.mainText]}>
            Зареєстуватися
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={[formStyles.mainText, formStyles.text]}>
            Вже є акаунт? Увійти
          </Text>
        </TouchableOpacity>
      </View>
    </BackgroundContainer>
  );
}

const styles = StyleSheet.create({
  registationContainer: {
    height: 549,
  },
  avatarContainer: {
    position: "absolute",
    top: -60,
    left: "50%",
    marginLeft: -60,
    zIndex: 1,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  plusContainer: {
    position: "absolute",
    top: 81,
    right: -12.5,
  },
});
