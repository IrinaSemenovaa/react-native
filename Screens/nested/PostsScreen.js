import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import { EvilIcons } from "@expo/vector-icons";
import avatarImage from "../image/defAvatar.png";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";

export default function PostsScreen({ route, navigation }) {
  const user = useSelector((state) => state.auth.user);
  console.log("User PostScreen", user);
  const [posts, setPosts] = useState([]);
  const [commentsCount, setCommentsCount] = useState({});

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (querySnapshot) => {
      const updatedPosts = [];
      const updatedCommentsCount = {};

      querySnapshot.forEach((doc) => {
        const post = doc.data();
        updatedPosts.push(post);

        if (post.comments && Array.isArray(post.comments)) {
          updatedCommentsCount[post.postId] = post.comments.length;
        } else {
          updatedCommentsCount[post.postId] = 0;
        }
      });

      setPosts(updatedPosts);
      console.log(updatedPosts);
      setCommentsCount(updatedCommentsCount);

      console.log(updatedCommentsCount);
    });

    return () => unsubscribe();
  }, []);

  const handleOpenComments = (photoURL, postId) => {
    navigation.navigate("Comments", {
      photoURL,
      postId,
      userId: user.id,
    });
  };

  const handleOpenMap = (photo, locationInfo, latitude, longitude) => {
    navigation.navigate("Map", {
      photo,
      locationInfo,
      latitude,
      longitude,
    });
  };

  return (
    <View style={styles.postsContainer}>
      <View style={styles.userContainer}>
        {user.photo ? (
          <Image source={{ uri: user.photo }} style={styles.avatar} />
        ) : (
          <Image
            source={avatarImage}
            style={styles.avatar}
          />
        )}
        <View style={styles.userInfo}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Image source={{ uri: item.photoURL }} style={styles.post} />
            <View style={styles.contentContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.detailsContainer}>
                <View style={styles.commentsContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      handleOpenComments(item.photoURL, item.postId)
                    }
                  >
                    <EvilIcons
                      name="comment"
                      size={24}
                      color={
                        commentsCount[item.postId] > 0 ? "#FF6C00" : "#BDBDBD"
                      }
                      style={styles.commentIcon}
                    />
                  </TouchableOpacity>
                  <Text
                    style={[
                      styles.commentCount,
                      {
                        color:
                          commentsCount[item.postId] > 0
                            ? "#212121"
                            : "#BDBDBD",
                      },
                    ]}
                  >
                    {commentsCount[item.postId] || 0}
                  </Text>
                </View>
                <View style={styles.locationContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      handleOpenMap(
                        item.photo,
                        item.locationInfo,
                        item.latitude,
                        item.longitude
                      )
                    }
                  >
                    <EvilIcons
                      name="location"
                      size={24}
                      color="#BDBDBD"
                      style={styles.locationIcon}
                    />
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
    borderRadius: 8,
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
    marginRight: 9,
    transform: [{ scaleX: -1 }],
  },
  commentCount: {
    fontFamily: "RobotoRegular",
    fontWeight: "400",
    fontSize: 16,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: {
    marginRight: 8,
  },
  locationText: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "RobotoRegular",
  },
});
