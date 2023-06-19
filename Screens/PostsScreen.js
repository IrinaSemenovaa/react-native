import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import logOutIcon from "./image/log-out.png";

export default function PostsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Публікації</Text>
        <View style={styles.imageContainer}>
          <Image source={logOutIcon} style={styles.image} />
        </View>
      </View>
      <ScrollView></ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 55,
    paddingBottom: 11,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(189, 189, 189, 1)",
  },
  title: {
    fontFamily: "RobotoMedium",
    fontWeight: "500",
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.408,
  },
  imageContainer: {
    position: "absolute",
    top: 54,
    right: 16,
  },
  image: {
    width: 24,
    height: 24,
  },
});
