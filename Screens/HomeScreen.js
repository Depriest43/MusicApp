import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Audio } from "expo-av";

import AudioPlayer from "../Components/AudioPlayer";
import RatingPicker from "../Components/RatingPicker";
import CommentBox from "../Components/CommentBox";
import SubmitButton from "../Components/SubmitButton";

const genres = {
  Pop: [
    { title: "Into You", artist: "Ariana Grande", file: require("../assets/Songs/ArianaGrandeIntoYou.mp3") },
    { title: "Stitches", artist: "Shawn Mendes", file: require("../assets/Songs/ShawnMendesStitches.mp3") },
  ],
  "R&B": [{ title: "Hard Place", artist: "H.E.R.", file: require("../assets/Songs/HerHardPlace.mp3") }],
  Country: [
    { title: "Before He Cheats", artist: "Carrie Underwood", file: require("../assets/Songs/CarrieUnderwoodBeforeHeCheats.mp3") },
    { title: "Ring of Fire", artist: "Johnny Cash", file: require("../assets/Songs/JohnnyCash_RingOfFire.mp3") },
    { title: "Country Girl", artist: "Unknown", file: require("../assets/Songs/CountryGirl.mp3") },
  ],
  Rock: [{ title: "American Idiot", artist: "Green Day", file: require("../assets/Songs/GreenDayAmericanIdiot.mp3") }],
  Jazz: [
    { title: "Blue In Green", artist: "Miles Davis", file: require("../assets/Songs/MilesDavisBlueInGreen.mp3") },
    { title: "Naima", artist: "John Coltrane", file: require("../assets/Songs/NaimaJohnColtrane.mp3") },
    { title: "Sunrise", artist: "Norah Jones", file: require("../assets/Songs/NorahJonesSunrise.mp3") },
  ],
};

const HomeScreen = ({ navigation }) => {
  const [selectedGenre, setSelectedGenre] = useState("Pop");
  const [selectedSong, setSelectedSong] = useState(genres["Pop"][0]);
  const [ratings, setRatings] = useState({ Lyrics: 0, Vocals: 0, Mixing: 0 });
  const [comment, setComment] = useState("");
  const [showScore, setShowScore] = useState(false);
  const [showRoses, setShowRoses] = useState(false);
  const [showDiamonds, setShowDiamonds] = useState(false);
  const [jetSound, setJetSound] = useState(null);
  const [applauseSound, setApplauseSound] = useState(null);

  useEffect(() => {
    console.log("🏠 HomeScreen Loaded Successfully!");
  }, []);

  useEffect(() => {
    const songs = genres[selectedGenre];
    setSelectedSong(songs.length > 0 ? songs[0] : null);
  }, [selectedGenre]);

  useEffect(() => {
    let jet, applause;

    async function loadSounds() {
      try {
        jet = new Audio.Sound();
        await jet.loadAsync(require("../assets/Songs/jet.mp3"));
        setJetSound(jet);

        applause = new Audio.Sound();
        await applause.loadAsync(require("../assets/Songs/applause.mp3"));
        setApplauseSound(applause);
      } catch (error) {
        console.log("Error loading sounds:", error);
      }
    }

    loadSounds();

    return () => {
      if (jet) jet.unloadAsync();
      if (applause) applause.unloadAsync();
    };
  }, []);

  const totalRating = Object.values(ratings)
    .map(Number)
    .reduce((acc, value) => acc + value, 0);

  const revealScoreAndPlayEffects = () => {
    if (totalRating === 0) return;
    setShowScore(true);

    if (totalRating >= 10 && totalRating <= 12) {
      playCelebration();
    } else if (totalRating >= 13 && totalRating <= 15) {
      playDiamondCelebration();
    }
  };

  const playCelebration = async () => {
    setShowRoses(true);
    if (applauseSound) await applauseSound.replayAsync();
    setTimeout(() => setShowRoses(false), 4000);
  };

  const playDiamondCelebration = async () => {
    setShowDiamonds(true);
    if (jetSound) await jetSound.replayAsync();
    setTimeout(() => setShowDiamonds(false), 4000);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
          <Text style={styles.header}>Select a Genre</Text>
          <Picker selectedValue={selectedGenre} onValueChange={setSelectedGenre} style={styles.picker}>
            {Object.keys(genres).map((genre) => (
              <Picker.Item key={genre} label={genre} value={genre} />
            ))}
          </Picker>

          {selectedSong && (
            <>
              <Text style={styles.header}>Select a Song</Text>
              <Picker selectedValue={selectedSong} onValueChange={(itemValue) => setSelectedSong(itemValue)} style={styles.picker}>
                {genres[selectedGenre].map((song) => (
                  <Picker.Item key={song.title} label={`${song.title} - ${song.artist}`} value={song} />
                ))}
              </Picker>
              <AudioPlayer song={selectedSong} />
            </>
          )}

          <Text style={styles.header}>Rate This Song</Text>
          <RatingPicker category="Lyrics" onSelect={(category, value) => setRatings({ ...ratings, [category]: Number(value) })} />
          <RatingPicker category="Vocals" onSelect={(category, value) => setRatings({ ...ratings, [category]: Number(value) })} />
          <RatingPicker category="Mixing" onSelect={(category, value) => setRatings({ ...ratings, [category]: Number(value) })} />

          <TouchableOpacity
            style={styles.fansButton}
            onPress={revealScoreAndPlayEffects}
            accessibilityLabel="Press to reveal total rating and feedback"
          >
            <Text style={styles.fansButtonText}>Your Fans Think</Text>
          </TouchableOpacity>

          {showScore && totalRating > 0 && (
            <View
              style={styles.scoreContainer}
              accessible={true}
              accessibilityLiveRegion="polite"
              accessibilityLabel={`Total score is ${totalRating}`}
            >
              <Text style={styles.scoreText}>Total Score: {totalRating}</Text>
            </View>
          )}

          {showRoses && <Text style={styles.celebrationText}>🎉 Celebration! 🌹</Text>}
          {showDiamonds && <Text style={styles.celebrationText}>💎 Diamonds! ✈️</Text>}

          <CommentBox onCommentChange={setComment} />
          <SubmitButton navigation={navigation} ratings={ratings} comment={comment} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  scrollViewContent: { paddingBottom: 20 },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  picker: { height: 50, width: "100%", marginBottom: 15 },
  fansButton: { backgroundColor: "#007ACC", padding: 10, borderRadius: 5, marginVertical: 10 },
  fansButtonText: { color: "white", textAlign: "center", fontSize: 16 },
  scoreContainer: { alignItems: "center", marginBottom: 15 },
  scoreText: { fontSize: 24, fontWeight: "bold" },
  celebrationText: { textAlign: "center", fontSize: 20, color: "gold", marginVertical: 10 },
});

export default HomeScreen;
