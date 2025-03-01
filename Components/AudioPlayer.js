import React, { useState, useEffect } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { Audio } from "expo-av";

const AudioPlayer = () => {
  const [sound, setSound] = useState(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let soundObject; // Declare sound instance

    const loadSound = async () => {
      try {
        // Load and prepare sound
        const { sound } = await Audio.Sound.createAsync(
          require("../assets/YouDontYouWont.mp3")
        );
        soundObject = sound;
        setSound(soundObject);

        // Playback status listener (resets play state when song finishes)
        soundObject.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            setPlaying(false);
          }
        });
      } catch (error) {
        console.error("Error loading sound:", error);
      }
    };

    loadSound();

    return () => {
      if (soundObject) {
        soundObject.unloadAsync();
      }
    };
  }, []);

  const togglePlayPause = async () => {
    if (!sound) return; // Prevent errors if sound isn't loaded

    try {
      if (playing) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setPlaying(!playing);
    } catch (error) {
      console.error("Error controlling playback:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title={playing ? "Pause" : "Play"}
        onPress={togglePlayPause}
        color="#007ACC"
      />
      <Text style={styles.text}>Now Playing: You Don't! You Won't!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { margin: 20, alignItems: "center" },
  text: { color: "#333", fontSize: 16, marginTop: 10 },
});

export default AudioPlayer;
