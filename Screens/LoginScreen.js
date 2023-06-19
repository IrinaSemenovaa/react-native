import React, { useState } from "react";
import {
  TouchableOpacity,
  TextInput,
  Text,
  View,
  ImageBackground,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { formStyles } from "./styles";

import bgImage from "./image/PhotoBG.jpg";

export default function LoginScreen() {
  const [isFocused, setIsFocused] = useState({
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

  const inputStyle = (field) =>
    isFocused[field] ? formStyles.inputFocused : formStyles.input;

  const formStyle = {
    ...formStyles.formContainer,
    marginBottom: isFocused.email || isFocused.password ? -240 : 0,
  };
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
                styles.loginContainer,
              ]}
            >
              <Text style={[formStyles.title, styles.loginTitle]}>Увійти</Text>
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
                  Увійти
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={[formStyles.mainText, formStyles.text]}>
                  Немає акаунту?{" "}
                  <Text style={{ textDecorationLine: "underline" }}>
                    Зареєструватися
                  </Text>
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
  loginContainer: {
    height: 489,
  },
  loginTitle: {
    marginTop: -64,
  },
  loginContent: {
    justifyContent: "flex-end",
  },
});
