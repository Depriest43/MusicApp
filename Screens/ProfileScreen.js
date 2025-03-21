import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const ProfileScreen = ({ route, navigation }) => {
  const { name = "Guest", email = "Not Provided", isArtist = false } = route.params || {};

  const handleBackToWelcome = () => {
    navigation.navigate("Welcome");
  };

  return (
    <View style={styles.container} accessible={true}>
      <Text style={styles.title} accessibilityRole="header">Profile</Text>
      <Text style={styles.info}>Name: {name}</Text>
      <Text style={styles.info}>Email: {email}</Text>
      <Text style={styles.info}>Role: {isArtist ? "Artist" : "Listener"}</Text>

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
  container: { flex: 1, padding: 20, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  info: { fontSize: 18, marginBottom: 10 },
  backButton: { marginTop: 30 },
});

export default ProfileScreen;
