import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";

import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";

import avatarImage from "../image/defAvatar.png";
import deleteAvatar from "../image/deleteAvatar.png";
import { EvilIcons } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }) {
  const user = useSelector((state) => state.auth.user);
  const [posts, setPosts] = useState([]);
  const [commentsCount, setCommentsCount] = useState({});

  useEffect(() => {
    const q = query(collection(db, "posts"), where("userId", "==", user.id));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
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
      setCommentsCount(updatedCommentsCount);
    });

    return () => unsubscribe();
  }, [user.id]);

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
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../image/PhotoBG.jpg")}
        style={styles.backgroundImage}
      />
      <View style={styles.contentContainer}>
        <View style={styles.contentWrapper}>
          <View style={styles.innerContent}>
            <View style={styles.avatarContainer}>
              {user.photo ? (
                <Image source={{ uri: user.photo }} style={styles.avatar} />
              ) : (
                <Image source={avatarImage} style={styles.avatar} />
              )}
              <View style={styles.plusContainer}>
                <Image source={deleteAvatar} style={styles.deleteIcon} />
              </View>
            </View>
            <Text style={styles.nameText}>{user.name}</Text>
            <FlatList
              data={posts}
              renderItem={({ item }) => (
                <View style={styles.postContainer}>
                  <Image source={{ uri: item.photoURL }} style={styles.post} />
                  <Text style={styles.title}>{item.title}</Text>
                  <View style={styles.iconsContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        handleOpenComments(item.photoURL, item.postId)
                      }
                      style={styles.iconContainer}
                    >
                      <EvilIcons
                        name="comment"
                        size={24}
                        color={
                          commentsCount[item.postId] > 0 ? "#FF6C00" : "#BDBDBD"
                        }
                        style={styles.icon}
                      />
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
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer}>
                      <EvilIcons
                        name="like"
                        size={26}
                        color="#BDBDBD"
                        style={styles.icon}
                      />
                      <Text style={styles.commentCount}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        handleOpenMap(
                          item.photo,
                          item.locationInfo,
                          item.latitude,
                          item.longitude
                        )
                      }
                      style={styles.iconContainer}
                    >
                      <EvilIcons
                        name="location"
                        size={24}
                        color="#BDBDBD"
                        style={styles.icon}
                      />
                      <Text style={styles.locationText}>
                        {item.locationInfo}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 130,
  },
  contentWrapper: {
    flexGrow: 1,
    alignItems: "center",
  },
  innerContent: {
    alignItems: "center",
    paddingTop: 128,
  },
  avatarContainer: {
    justifyContent: 'center',
    marginTop: -185,
    zIndex: 1,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  plusContainer: {
    position: "absolute",
    top: 75,
    right: -17.18,
  },
  deleteIcon: {
    width: 35,
    height: 35,
  },
  nameText: {
    position: "relative",
    textAlign: "center",
    fontWeight: 500,
    fontSize: 30,
    marginBottom: 32,
    marginTop: 32,
    fontFamily: "RobotoMedium",
  },
  postContainer: {
    alignItems: "flex-start",
    marginHorizontal: 16,
    marginBottom: 32,
  },
  post: {
    width: 343,
    height: 240,
    minHeight: 240,
    minWidth: 343,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 8,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 16,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 6,
  },
  commentCount: {
    fontSize: 16,
    color: "#BDBDBD",
  },
  locationText: {
    fontSize: 16,
    color: "#212121",
  },
});
