import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const CommentBox = ({ onCommentChange }) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (text) => {
    setComment(text);
    if (typeof onCommentChange === "function") {
      onCommentChange(text);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Leave a comment for the artist:</Text>
      <TextInput
        value={comment}
        onChangeText={handleCommentChange}
        placeholder="Type your comment here..."
        multiline
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { margin: 10 },
  label: { color: "#333333", fontSize: 16, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#005A87",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#FFFFFF",
    color: "#000",
    minHeight: 60, // Ensures proper multiline input
    textAlignVertical: "top", // Ensures text starts at the top
  },
});

export default CommentBox;
