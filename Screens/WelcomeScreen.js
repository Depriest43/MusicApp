import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const WelcomeScreen = ({ navigation }) => {
  if (!navigation) {
    console.error(
      "Navigation prop is missing. Ensure WelcomeScreen is inside a Navigator.",
    );
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MusicApp</Text>
      <View style={styles.buttonContainer}>
        <Button title="Log In" onPress={() => navigation.navigate("Login")} />
        <Button title="Sign Up" onPress={() => navigation.navigate("SignUp")} />
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
  title: { fontSize: 24, marginBottom: 20, fontWeight: "bold" },
  buttonContainer: { width: "80%", gap: 10 },
});

export default WelcomeScreen;
