import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import RegistrationScreen from "./auth/RegistrationScreen";
import LoginScreen from "./auth/LoginScreen";
import ProfileScreen from "./main/ProfileScreen";
import NewPostScreen from "./main/CreatePostsScreen";
import Home from "./main/Home";
import { PostsNavigation } from "./main/PostNavigationScreen";

import postsIcon from "./image/posts-screen-icon.png";
import createPostIcon from "./image/new-post-icon.png";
import profileIcon from "./image/profile-screen-icon.png";
import backIcon from "./image/arrow-left.png";
import logOutIcon from "./image/log-out.png";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
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
        <AuthStack.Screen name="Home" component={Home} />
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
        name="Posts"
        component={PostsNavigation}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image source={postsIcon} style={{ width: 40, height: 40 }} />
          ),
        }}

        // options={{
        //   title: "Публікації",
        //   headerTitleStyle: {
        //     fontWeight: "500",
        //     fontSize: 17,
        //     lineHeight: 22,
        //     fontFamily: "RobotoMedium",
        //   },
        //   headerRight: () => (
        //     <TouchableOpacity>
        //       <Image
        //         source={logOutIcon}
        //         style={{ marginRight: 16, width: 24, height: 24 }}
        //       />
        //     </TouchableOpacity>
        //   ),
        //   tabBarIcon: () => (
        //     <Image source={postsIcon} style={{ width: 40, height: 40 }} />
        //   ),
        // }}
      ></MainTab.Screen>
      <MainTab.Screen
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
          headerLeft: () => (
            <TouchableOpacity>
              <Image
                source={backIcon}
                style={{ marginLeft: 20, width: 24, height: 24 }}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: () => (
            <Image source={createPostIcon} style={{ width: 70, height: 40 }} />
          ),
        }}
      ></MainTab.Screen>
      <MainTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image source={profileIcon} style={{ width: 40, height: 40 }} />
          ),
        }}
      ></MainTab.Screen>
    </MainTab.Navigator>
  );
};
