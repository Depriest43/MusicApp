import React from "react";
import { View, Button, StyleSheet, AccessibilityInfo } from "react-native";

const SubmitButton = ({ navigation, ratings = {}, comment = "" }) => {
  const handleSubmit = () => {
    AccessibilityInfo.announceForAccessibility("Your message has been sent.");
    navigation.navigate("Success");
  };

  return (
    <View style={styles.container}>
      <Button
        title="Submit"
        onPress={handleSubmit}
        color="#007ACC"
        accessibilityLabel="Submit"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { margin: 10, alignItems: "center" },
});

export default SubmitButton;
