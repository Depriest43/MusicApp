import React from "react";
import { View, Button, Alert, StyleSheet } from "react-native";

const SubmitButton = ({ ratings = {}, comment = "" }) => {
  const handleSubmit = () => {
    const formattedRatings =
      ratings && typeof ratings === "object"
        ? Object.entries(ratings)
            .map(([category, value]) => `${category}: ${value}`)
            .join("\n")
        : "No ratings provided";

    Alert.alert(
      "Feedback Submitted",
      `Ratings:\n${formattedRatings}\n\nComment:\n${comment || "No comment provided"}`
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Submit Rating" onPress={handleSubmit} color="#007ACC" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { margin: 10, alignItems: "center" },
});

export default SubmitButton;
    