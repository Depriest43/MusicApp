import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  AccessibilityInfo,
} from "react-native";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";

const AudioPlayer = ({ song }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (song) loadSound();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (sound) {
        sound.unloadAsync().catch((err) =>
          console.error("Error unloading sound:", err)
        );
      }
    };
  }, [song]);

  const loadSound = async () => {
    if (!song) return;
    try {
      if (sound) await sound.unloadAsync();

      const { sound: newSound, status } = await Audio.Sound.createAsync(
        song.file,
        { shouldPlay: false },
        updatePlaybackStatus
      );

      setSound(newSound);
      if (status && status.durationMillis) {
        setDuration(status.durationMillis);
      }

      AccessibilityInfo.announceForAccessibility(`Loaded ${song.title}`);
    } catch (error) {
      console.error("Error loading sound:", error);
    }
  };

  const updatePlaybackStatus = (status) => {
    if (status?.isLoaded) {
      setPosition(status.positionMillis || 0);
      setDuration(status.durationMillis || 1);
      if (status.didJustFinish) {
        setIsPlaying(false);
        setPosition(0);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }
  };

  const startUpdatingProgress = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(async () => {
      if (sound) {
        const status = await sound.getStatusAsync();
        updatePlaybackStatus(status);
      }
    }, 500);
  };

  const stopUpdatingProgress = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const togglePlayPause = async () => {
    if (!sound) return;
    if (isPlaying) {
      await sound.pauseAsync();
      stopUpdatingProgress();
      AccessibilityInfo.announceForAccessibility("Paused playback.");
    } else {
      await sound.playAsync();
      startUpdatingProgress();
      AccessibilityInfo.announceForAccessibility(`Playing ${song.title}`);
    }
    setIsPlaying(!isPlaying);
  };

  const handleRewind = async () => {
    if (sound) {
      const newPosition = Math.max(position - 5000, 0);
      await sound.setPositionAsync(newPosition);
      setPosition(newPosition);
      AccessibilityInfo.announceForAccessibility("Rewinding 5 seconds.");
    }
  };

  const handleFastForward = async () => {
    if (sound) {
      const newPosition = Math.min(position + 5000, duration);
      await sound.setPositionAsync(newPosition);
      setPosition(newPosition);
      AccessibilityInfo.announceForAccessibility("Fast forwarding 5 seconds.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.songTitle} accessibilityRole="header">
        {song ? `Now Playing: ${song.title}` : "Select a song to play"}
      </Text>

      <View style={styles.controls}>
        <TouchableOpacity
          onPress={handleRewind}
          style={styles.button}
          accessibilityLabel="Rewind 5 seconds"
        >
          <Text style={styles.buttonText}>⏪</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={togglePlayPause}
          style={styles.button}
          accessibilityLabel={isPlaying ? "Pause playback" : "Play song"}
        >
          <Text style={styles.buttonText}>{isPlaying ? "⏸" : "▶"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleFastForward}
          style={styles.button}
          accessibilityLabel="Fast forward 5 seconds"
        >
          <Text style={styles.buttonText}>⏩</Text>
        </TouchableOpacity>
      </View>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onSlidingComplete={(val) => sound && sound.setPositionAsync(val)}
        accessibilityLabel="Playback progress slider"
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
  button: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: "#007ACC",
    borderRadius: 5,
  },
  buttonText: { fontSize: 20, color: "white" },
  slider: { width: 200, height: 40, marginTop: 10 },
  timer: { fontSize: 16, marginTop: 10 },
});

export default AudioPlayer;
