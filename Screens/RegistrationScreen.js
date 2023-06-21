import React, { useState } from "react";
import {
  TouchableOpacity,
  TextInput,
  Text,
  View,
  Image,
  StyleSheet,
} from "react-native";
import { BackgroundContainer } from "./BackgroundContainer";
import { formStyles } from "./Styles";
import avatarImage from "./image/defAvatar.png";
import addBtn from "./image/add.png";

export default function RegistrationScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = () => {
    const formData = {
      login: login,
      email: email,
      password: password,
    };
    console.log(`Registration: ${JSON.stringify(formData)}`);
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
          <Image source={avatarImage} style={styles.avatar} />
          <View style={styles.plusContainer}>
            <Image source={addBtn} style={styles.plusIcon} />
          </View>
        </View>
        <Text style={formStyles.title}>Реєстрація</Text>
        <TextInput
          style={[formStyles.mainText, formStyles.input]}
          placeholder="Логін"
          onFocus={() => setIsShowKeyboard(true)}
          onBlur={() => setIsShowKeyboard(false)}
          onChangeText={(text) => setLogin(text)}
        />
        <TextInput
          style={[formStyles.mainText, formStyles.input]}
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
            Зареєстуватися
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
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
  plusIcon: {
    width: 25,
    height: 25,
  },
});
