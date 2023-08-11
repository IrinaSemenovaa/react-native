import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Text,
} from "react-native";

import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase/config";

import { addCommentToPost } from "../redux/post/postOperations";

import { AntDesign } from "@expo/vector-icons";
import avatarImage from "../image/defAvatar.png";

export default function CommentsScreen({ route }) {
  const { photoURL, postId } = route.params;
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const authorPhoto = useSelector((state) => state.auth.user.photo);

  useEffect(() => {
    const postRef = doc(db, "posts", postId);
    const unsubscribe = onSnapshot(postRef, (doc) => {
      if (doc.exists()) {
        const post = doc.data();
        setComments(post.comments || []);
      }
    });

    return () => unsubscribe();
  }, [postId]);

  const handleAddComment = async () => {
    if (comment.trim() !== "") {
      try {
        const updatedComments = await addCommentToPost(postId, {
          authorId: route.params.userId,
          authorPhoto: authorPhoto,
          text: comment,
        });
        setComments(updatedComments);
        setComment("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const renderItem = ({ item }) => {
    const isAuthor = item.authorId === route.params.userId;
    const authorPhotoStyle = isAuthor
      ? { marginLeft: 16 }
      : { marginRight: 16 };
    return (
      <View
        style={[
          styles.commentContainer,
          isAuthor ? styles.commentAuthorContainer : null,
        ]}
      >
        <Image
          source={item.authorPhoto ? { uri: item.authorPhoto } : avatarImage}
          style={[styles.authorPhoto, authorPhotoStyle]}
        />

        <View style={styles.commentDetails}>
          <Text style={styles.commentText}>{item.text}</Text>
          <Text style={styles.dateText}>{item.timestamp}</Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[{ ...styles.container, marginBottom: isShowKeyboard ? 320 : 0 }]}
    >
      <Image
        source={{ uri: photoURL }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={{ flex: 1 }}>
        <FlatList
          data={comments}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={comment}
            onChangeText={setComment}
            onFocus={() => setIsShowKeyboard(true)}
            onBlur={() => setIsShowKeyboard(false)}
            placeholder="Коментувати..."
            placeholderTextColor="#BDBDBD"
          />
          <View style={styles.iconContainer}>
            <AntDesign
              name="arrowup"
              size={24}
              color="#FFFFFF"
              onPress={handleAddComment}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  image: {
    width: 343,
    height: 240,
    borderRadius: 8,
    marginVertical: 32,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    width: 343,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginBottom: 22,
  },
  input: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 15,
    paddingLeft: 16,
    fontFamily: "RobotoRegular",
    fontWeight: "500",
    fontSize: 16,
  },
  iconContainer: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FF6C00",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  commentAuthorContainer: {
    flexDirection: "row-reverse",
    marginBottom: 24,
  },
  authorPhoto: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 16,
  },
  commentDetails: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    padding: 16,
  },
  commentText: {
    flex: 1,
    marginBottom: 8,
    fontFamily: "RobotoRegular",
    fontWeight: "400",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
  },
  dateText: {
    fontFamily: "RobotoRegular",
    fontWeight: "400",
    fontSize: 10,
    color: "#BDBDBD",
    textAlign: "right",
  },
});
