import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const SuccessScreen = ({ navigation }) => {
  const handleBackToHome = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container} accessible={true}>
      <Text style={styles.message} accessibilityRole="header">
        Your message is sent!
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Back to Home"
          onPress={handleBackToHome}
          color="#007ACC"
          accessibilityLabel="Back to Home screen"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  message: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007ACC",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default SuccessScreen;
