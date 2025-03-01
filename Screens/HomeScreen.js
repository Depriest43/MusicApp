import React, { useState } from "react";
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import AudioPlayer from "../Components/AudioPlayer";
import RatingPicker from "../Components/RatingPicker";
import CommentBox from "../Components/CommentBox";
import SubmitButton from "../Components/SubmitButton";

const HomeScreen = () => {
  const [ratings, setRatings] = useState({ Lyrics: 0, Vocals: 0, Mixing: 0 });
  const [comment, setComment] = useState("");

  const handleRatingChange = (category, value) => {
    setRatings((prev) => ({ ...prev, [category]: value }));
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollViewContent} 
          keyboardShouldPersistTaps="handled"
        >
          <AudioPlayer />
          <RatingPicker category="Lyrics" onSelect={handleRatingChange} />
          <RatingPicker category="Vocals" onSelect={handleRatingChange} />
          <RatingPicker category="Mixing" onSelect={handleRatingChange} />
          <CommentBox onCommentChange={setComment} />
          <SubmitButton ratings={ratings} comment={comment} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  scrollViewContent: { padding: 20 },
});

export default HomeScreen;
