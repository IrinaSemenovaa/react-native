import React from "react";

import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import RegistrationScreen from "./auth/RegistrationScreen";
import LoginScreen from "./auth/LoginScreen";
import { HomeStackScreen } from "./main/Home";
import CommentsScreen from "./nested/CommentsScreen";
import MapScreen from "./nested/MapScreen";

import { AntDesign } from "@expo/vector-icons";

const AuthStack = createStackNavigator();
const MainTab = createStackNavigator();

export const useRoute = (user) => {
  if (!user) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingTop: 9,
          paddingHorizontal: 81,
          paddingBottom: 34,
        },
      }}
    >
      <MainTab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{ headerShown: false }}
      ></MainTab.Screen>
      <MainTab.Screen
        name="Comments"
        component={CommentsScreen}
        options={({ navigation }) => ({
          title: "Коментарі",
          headerTitleStyle: {
            fontWeight: "500",
            fontSize: 17,
            lineHeight: 22,
            fontFamily: "RobotoMedium",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="arrowleft" size={24} color="#212121CC" />
            </TouchableOpacity>
          ),
        })}
      ></MainTab.Screen>
      <MainTab.Screen
        name="Map"
        component={MapScreen}
        options={({ navigation }) => ({
          title: "Мапа",
          headerTitleStyle: {
            fontWeight: "500",
            fontSize: 17,
            lineHeight: 22,
            fontFamily: "RobotoMedium",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="arrowleft" size={24} color="#212121CC" />
            </TouchableOpacity>
          ),
        })}
      ></MainTab.Screen>
    </MainTab.Navigator>
  );
};
