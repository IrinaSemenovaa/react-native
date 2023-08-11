import React from "react";
import { useDispatch } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, View } from "react-native";

import { logoutUser } from "../redux/auth/authOperations";

import PostsScreen from "../nested/PostsScreen";
import NewPostScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const HomeTab = createBottomTabNavigator();

const PlusIcon = () => (
  <View
    style={{
      width: 70,
      height: 40,
      borderRadius: 20,
      backgroundColor: "#FF6C00",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <AntDesign name="plus" size={15} color="#FFFFFF" />
  </View>
);

export const HomeStackScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <HomeTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingTop: 9,
          paddingHorizontal: 81,
          paddingBottom: 34,
        },
      }}
    >
      <HomeTab.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          title: "Публікації",
          headerTitleStyle: {
            fontWeight: "500",
            fontSize: 17,
            lineHeight: 22,
            fontFamily: "RobotoMedium",
          },
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 16 }}
              onPress={handleLogout}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          tabBarIcon: () => (
            <AntDesign name="appstore-o" size={24} color="#212121CC" />
          ),
        }}
      ></HomeTab.Screen>
      <HomeTab.Screen
        name="CreatePostsScreen"
        component={NewPostScreen}
        options={{
          title: "Створити публікацію",
          headerTitleStyle: {
            fontWeight: "500",
            fontSize: 17,
            lineHeight: 22,
            fontFamily: "RobotoMedium",
          },
          tabBarStyle: { display: "none" },
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => navigation.navigate("PostsScreen")}
            >
              <AntDesign name="arrowleft" size={24} color="#212121CC" />
            </TouchableOpacity>
          ),
          tabBarIcon: () => <PlusIcon />,
        }}
      ></HomeTab.Screen>
      <HomeTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => <Feather name="user" size={24} color="#212121CC" />,
        }}
      ></HomeTab.Screen>
    </HomeTab.Navigator>
  );
};
