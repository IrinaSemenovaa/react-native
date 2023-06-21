import React, { useState } from "react";
import {
  TouchableOpacity,
  TextInput,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { BackgroundContainer } from "./BackgroundContainer";
import { formStyles } from "./Styles";

export default function LoginScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = () => {
    const formData = {
      email: email,
      password: password,
    };
    console.log(`Login: ${JSON.stringify(formData)}`);
  };

  return (
    <BackgroundContainer>
      <View
        style={[
          {
            ...formStyles.formContainer,
            marginBottom: isShowKeyboard ? -220 : 0,
          },
          styles.loginContainer,
        ]}
      >
        <Text style={[formStyles.title, styles.loginTitle]}>Увійти</Text>
        <TextInput
          style={[formStyles.input, formStyles.mainText]}
          placeholder="Адреса електронної пошти"
          onFocus={() => setIsShowKeyboard(true)}
          onBlur={() => setIsShowKeyboard(false)}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={[formStyles.input, formStyles.lastInput, formStyles.mainText]}
          placeholder="Пароль"
          secureTextEntry={true}
          onFocus={() => setIsShowKeyboard(true)}
          onBlur={() => setIsShowKeyboard(false)}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          style={formStyles.button}
          onPress={handleRegistration}
        >
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
    </BackgroundContainer>
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
