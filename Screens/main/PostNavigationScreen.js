import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CommentsScreen from "../nested/CommentsScreen";
import MapScreen from "../nested/MapScreen";
import PostsScreen from "../nested/PostsScreen";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import postsIcon from "../image/posts-screen-icon.png";
import logOutIcon from "../image/log-out.png";

const NestedScreen = createStackNavigator();

export const PostsNavigation = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
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
            <TouchableOpacity>
              <Image
                source={logOutIcon}
                style={{ marginRight: 16, width: 24, height: 24 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreen.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{
          title: "Коментарі",
          headerTitleStyle: {
            fontWeight: "500",
            fontSize: 17,
            lineHeight: 22,
            fontFamily: "RobotoMedium",
          },
        }}
      />
      <NestedScreen.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          title: "Навігація",
          headerTitleStyle: {
            fontWeight: "500",
            fontSize: 17,
            lineHeight: 22,
            fontFamily: "RobotoMedium",
          },
        }}
      />
    </NestedScreen.Navigator>
  );
};
