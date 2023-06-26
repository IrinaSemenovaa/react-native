import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import commentIcon from "../image/comment-icon.png";
import navIcon from "../image/nav-icon.png";

export default function PostsScreen({ route, navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      const { photo, title, locationInfo } = route.params;
      const post = { photo, title, locationInfo };
      setPosts((prevState) => [...prevState, post]);
    }
  }, [route.params]);

  return (
    <View style={styles.postsContainer}>
      <View style={styles.userContainer}>
        <Image style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>Name</Text>
          <Text style={styles.email}>Email</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Image source={{ uri: item.photo }} style={styles.post} />
            <View style={styles.contentContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.detailsContainer}>
                <View style={styles.commentsContainer}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("CommentsScreen")}
                  >
                    <Image source={commentIcon} style={styles.commentIcon} />
                  </TouchableOpacity>
                  <Text style={styles.commentCount}>0</Text>
                </View>
                <View style={styles.locationContainer}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("MapScreen")}
                  >
                    <Image source={navIcon} style={styles.locationIcon} />
                  </TouchableOpacity>
                  <Text style={styles.locationText}>{item.locationInfo}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  postsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginVertical: 32,
    marginLeft: 23,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "gray",
  },
  userInfo: {
    marginLeft: 8,
  },
  name: {
    fontSize: 13,
    lineHeight: 15,
    fontWeight: "700",
    fontFamily: "RobotoBold",
  },
  email: {
    fontSize: 11,
    lineHeight: 13,
    fontWeight: "400",
    fontFamily: "RobotoRegular",
    color: "rgba(33, 33, 33, 0.8)",
  },
  postContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginBottom: 32,
  },
  post: {
    width: 343,
    height: 240,
  },
  contentContainer: {
    alignItems: "flex-start",
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 11,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  commentsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 53,
  },
  commentIcon: {
    width: 18,
    height: 18,
    marginRight: 9,
  },
  commentCount: {
    fontSize: 16,
    color: "#BDBDBD",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: {
    width: 18,
    height: 20,
    marginRight: 8,
  },
  locationText: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "RobotoRegular",
  },
});
