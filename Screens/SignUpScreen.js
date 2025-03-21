import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  CheckBox,
} from "react-native";

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isArtist, setIsArtist] = useState(false);

  const handleSignUp = () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    navigation.navigate("Profile", { name, email, isArtist });
  };

  const handleBackToWelcome = () => {
    navigation.navigate("Welcome");
  };

  return (
    <View style={styles.container} accessible={true}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        accessibilityLabel="Name input"
        accessibilityHint="Enter your full name"
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        accessibilityLabel="Email input"
        accessibilityHint="Enter your email address"
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        accessibilityLabel="Password input"
        accessibilityHint="Enter your password"
      />

      <Text style={styles.label}>Confirm Password:</Text>
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
        accessibilityLabel="Confirm password input"
        accessibilityHint="Re-enter your password"
      />

      <View
        style={styles.checkboxContainer}
        accessible={true}
        accessibilityLabel="Check here if you are an Artist."
      >
        <CheckBox
          value={isArtist}
          onValueChange={setIsArtist}
          accessibilityLabel="Are you an Artist?"
        />
        <Text style={styles.checkboxText}>Are you an Artist?</Text>
      </View>

      <Button title="Sign Up" onPress={handleSignUp} />

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
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkboxText: {
    fontSize: 16,
    marginLeft: 10,
  },
  backButton: {
    marginTop: 15,
  },
});

export default SignUpScreen;
