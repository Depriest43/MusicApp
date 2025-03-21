import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const validUsername = "CSI248JE";
    const validPassword = "1234";

    if (username === validUsername && password === validPassword) {
      navigation.navigate("Home");
    } else {
      Alert.alert(
        "Login Failed",
        "Invalid username or password. Please try again."
      );
    }
  };

  const handleBackToWelcome = () => {
    navigation.navigate("Welcome"); // 👈 Make sure "Welcome" is registered in your navigator
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username:</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        placeholder="Enter username"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholder="Enter password"
      />

      <Button title="Login" onPress={handleLogin} />

      {/* ✅ Back to Welcome Page Button */}
      <View style={styles.backButton}>
        <Button
          title="Back to Welcome Page"
          onPress={handleBackToWelcome}
          color="#888"
          accessibilityLabel="Go back to the welcome screen"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  label: { fontSize: 16, marginBottom: 5 },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5 },
  backButton: { marginTop: 15 },
});

export default LoginScreen;
