import React, { useState } from "react";
import {
  TouchableOpacity,
  TextInput,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";

import { BackgroundContainer } from "../BackgroundContainer";
import { formStyles } from "../Styles";

import { loginUser } from "../redux/auth/authOperations";

const initialState = {
  nickname: "",
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(loginUser(state));
    setState(initialState);
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
          onChangeText={(value) =>
            setState((prevState) => ({ ...prevState, password: value }))
          }
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
