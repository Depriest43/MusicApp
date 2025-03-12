import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements"; // Import CheckBox

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isArtist, setIsArtist] = useState(false); // State for Artist checkbox

  const handleSignUp = () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log("User Signed Up:", { name, email, isArtist });

    // Navigate to Home after successful sign-up
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Enter name" />

      <Text style={styles.label}>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder="Enter email" />

      <Text style={styles.label}>Password:</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry style={styles.input} placeholder="Enter password" />

      <Text style={styles.label}>Confirm Password:</Text>
      <TextInput value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry style={styles.input} placeholder="Confirm password" />

      {/* ✅ Checkbox for Artist Selection */}
      <CheckBox
        title="Are you an Artist?"
        checked={isArtist}
        onPress={() => setIsArtist(!isArtist)}
        containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxText}
      />

      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  label: { fontSize: 16, marginBottom: 5 },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5 },
  checkboxContainer: { backgroundColor: "transparent", borderWidth: 0, marginBottom: 15 },
  checkboxText: { fontSize: 16 },
});

export default SignUpScreen;
