import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Slider, StyleSheet } from "react-native";
import { Audio } from "expo-av";

const AudioPlayer = ({ song }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (song) {
      loadSound();
    }

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [song]);

  const loadSound = async () => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound, status } = await Audio.Sound.createAsync(
        song.file,
        { shouldPlay: false },
        updatePlaybackStatus
      );

      setSound(newSound);
      setDuration(status.durationMillis || 0);
    } catch (error) {
      console.error("Error loading sound:", error);
    }
  };

  const updatePlaybackStatus = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis || 0);
      setDuration(status.durationMillis || 0);
      if (status.didJustFinish) {
        setIsPlaying(false);
      }
    }
  };

  const togglePlayPause = async () => {
    if (!sound) return;
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const handleRewind = async () => {
    if (sound) {
      const newPosition = Math.max(position - 5000, 0);
      await sound.setPositionAsync(newPosition);
      setPosition(newPosition);
    }
  };

  const handleFastForward = async () => {
    if (sound) {
      const newPosition = Math.min(position + 5000, duration);
      await sound.setPositionAsync(newPosition);
      setPosition(newPosition);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.songTitle}>{song ? `Now Playing: ${song.title}` : "No Song Selected"}</Text>

      <View style={styles.controls}>
        <TouchableOpacity onPress={handleRewind} style={styles.button}>
          <Text style={styles.buttonText}>⏪</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlayPause} style={styles.button}>
          <Text style={styles.buttonText}>{isPlaying ? "⏸" : "▶"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFastForward} style={styles.button}>
          <Text style={styles.buttonText}>⏩</Text>
        </TouchableOpacity>
      </View>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onSlidingComplete={(val) => sound && sound.setPositionAsync(val)}
      />

      <Text style={styles.timer}>
        {formatTime(position)} / {formatTime(duration)}
      </Text>
    </View>
  );
};

const formatTime = (millis) => {
  if (!millis) return "0:00";
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const styles = StyleSheet.create({
  container: { alignItems: "center", marginTop: 20 },
  songTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  controls: { flexDirection: "row", justifyContent: "center", marginTop: 10 },
  button: { marginHorizontal: 10, padding: 10, backgroundColor: "#007ACC", borderRadius: 5 },
  buttonText: { fontSize: 20, color: "white" },
  slider: { width: 200, height: 40, marginTop: 10 },
  timer: { fontSize: 16, marginTop: 10 },
});

export default AudioPlayer;
