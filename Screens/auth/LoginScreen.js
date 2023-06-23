import React, { useState } from "react";
import {
  TouchableOpacity,
  TextInput,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { BackgroundContainer } from "../BackgroundContainer";
import { formStyles } from "../Styles";
// import { CommonActions } from "@react-navigation/native";

export default function LoginScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const formData = {
      email: email,
      password: password,
    };
    console.log(`Login: ${JSON.stringify(formData)}`);

    navigation.navigate("Home", {
      screen: "PostsScreen",
    });

    // navigation.dispatch(
    //   CommonActions.reset({
    //     index: 0,
    //     routes: [{ name: "Home", params: { screen: "PostsScreen" } }],
    //   })
    // );

    setEmail("");
    setPassword("");
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
        <TouchableOpacity style={formStyles.button} onPress={handleLogin}>
          <Text style={[formStyles.buttonText, formStyles.mainText]}>
            Увійти
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[formStyles.mainText, formStyles.text]}>
            Немає акаунту?{" "}
            <Text
              onPress={() => navigation.navigate("Registration")}
              style={{ textDecorationLine: "underline" }}
            >
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
