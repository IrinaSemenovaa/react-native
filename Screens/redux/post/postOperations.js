import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";

export const addCommentToPost = async (postId, newComment) => {
  try {
    const timestamp = new Date();

    const formattedDate = `${timestamp.getDate()} ${getMonthName(
      timestamp.getMonth()
    )}, ${timestamp.getFullYear()} | ${timestamp.getHours()}:${timestamp.getMinutes()}`;

    newComment.timestamp = formattedDate;

    const postRef = doc(db, "posts", postId);

    const postSnap = await getDoc(postRef);
    const currentComments = postSnap.data()?.comments || [];

    const updatedComments = [...currentComments, newComment];

    await updateDoc(postRef, { comments: updatedComments });

    return updatedComments;
  } catch (error) {
    console.error("Error adding comment to post:", error);
    throw error;
  }
};

const getMonthName = (month) => {
  const monthNames = [
    "січня",
    "лютого",
    "березня",
    "квітня",
    "травня",
    "червня",
    "липня",
    "серпня",
    "вересня",
    "жовтня",
    "листопада",
    "грудня",
  ];
  return monthNames[month];
};
