import React from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import HomeScreen from "./Screens/HomeScreen";

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <HomeScreen />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFF" },
  container: { flex: 1 },
});
