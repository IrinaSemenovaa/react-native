import React, { useState } from "react";
import {
  TouchableOpacity,
  TextInput,
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { formStyles } from "./styles";

import bgImage from "./image/PhotoBG.jpg";
import avatarImage from "./image/defAvatar.png";
import addBtn from "./image/add.png";

export default function RegistrationScreen() {
  const [isFocused, setIsFocused] = useState({
    login: false,
    email: false,
    password: false,
  });

  const handleFocus = (field) => {
    setIsFocused((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  };
  const handleBlur = (field) => {
    setIsFocused((prevState) => ({
      ...prevState,
      [field]: false,
    }));
  };

  const formStyle = {
    ...formStyles.formContainer,
    marginBottom:
      isFocused.email || isFocused.login || isFocused.password ? -200 : 0,
  };

  const inputStyle = (field) =>
    isFocused[field] ? formStyles.inputFocused : formStyles.input;

  return (
    <ImageBackground source={bgImage} style={formStyles.backgroundImage}>
      <View style={formStyles.container}>
        <ScrollView
          contentContainerStyle={formStyles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={[
                formStyle,
                formStyles.formContainer,
                styles.registationContainer,
              ]}
            >
              <View style={styles.avatarContainer}>
                <Image source={avatarImage} style={styles.avatar} />
                <View style={styles.plusContainer}>
                  <Image source={addBtn} style={styles.plusIcon} />
                </View>
              </View>
              <Text style={formStyles.title}>Реєстрація</Text>
              <TextInput
                style={[inputStyle("login"), formStyles.mainText]}
                placeholder="Логін"
                onFocus={() => handleFocus("login")}
                onBlur={() => handleBlur("login")}
              />
              <TextInput
                style={[inputStyle("email"), formStyles.mainText]}
                placeholder="Адреса електронної пошти"
                onFocus={() => handleFocus("email")}
                onBlur={() => handleBlur("email")}
              />
              <TextInput
                style={[
                  inputStyle("password"),
                  formStyles.lastInput,
                  formStyles.mainText,
                ]}
                placeholder="Пароль"
                onFocus={() => handleFocus("password")}
                onBlur={() => handleBlur("password")}
              />
              <TouchableOpacity style={formStyles.button}>
                <Text style={[formStyles.buttonText, formStyles.mainText]}>
                  Зареєстуватися
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={[formStyles.mainText, formStyles.text]}>
                  Вже є акаунт? Увійти
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </ImageBackground>
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
  plusIcon: {
    width: 25,
    height: 25,
  },
});
