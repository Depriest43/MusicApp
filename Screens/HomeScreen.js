import React, { useState } from "react";
import { View, Text, FlatList, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import AudioPlayer from "../components/AudioPlayer";
import RatingPicker from "../components/RatingPicker";
import CommentBox from "../components/CommentBox";
import SubmitButton from "../components/SubmitButton";

// ✅ Genre and song data
const genres = {
  "Pop": [
    { title: "Into You", artist: "Ariana Grande", file: require("../assets/Songs/ArianaGrandeIntoYou.mp3") },
    { title: "Stitches", artist: "Shawn Mendes", file: require("../assets/Songs/ShawnMendesStitches.mp3") }
  ],
  "R&B": [
    { title: "Hard Place", artist: "H.E.R.", file: require("../assets/Songs/HerHardPlace.mp3") },
  ],
  "Country": [
    { title: "Before He Cheats", artist: "Carrie Underwood", file: require("../assets/Songs/CarrieUnderwoodBeforeHeCheats.mp3") },
    { title: "Ring of Fire", artist: "Johnny Cash", file: require("../assets/Songs/JohnnyCash_RingOfFire.mp3") },
    { title: "Country Girl", artist: "Unknown", file: require("../assets/Songs/CountryGirl.mp3") }
  ],
  "Hip-Hop": [
    { title: "Middle Child", artist: "J. Cole", file: require("../assets/Songs/JColeMiddleChild.mp3") }
  ],
  "Rock": [
    { title: "American Idiot", artist: "Green Day", file: require("../assets/Songs/GreenDayAmericanIdiot.mp3") }
  ],
  "Jazz": [
    { title: "Blue In Green", artist: "Miles Davis", file: require("../assets/Songs/MilesDavisBlueInGreen.mp3") },
    { title: "Naima", artist: "John Coltrane", file: require("../assets/Songs/NaimaJohnColtrane.mp3") },
    { title: "Sunrise", artist: "Norah Jones", file: require("../assets/Songs/NorahJonesSunrise.mp3") }
  ]
};

const HomeScreen = () => {
  const [selectedGenre, setSelectedGenre] = useState("Pop");
  const [selectedSong, setSelectedSong] = useState(null);
  const [ratings, setRatings] = useState({ Lyrics: 0, Vocals: 0, Mixing: 0 });
  const [comment, setComment] = useState("");

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">

          {/* 🎵 Genre Selection */}
          <Text style={styles.header}>Select a Genre</Text>
          <Picker selectedValue={selectedGenre} onValueChange={setSelectedGenre} style={styles.picker}>
            {Object.keys(genres).map((genre) => (
              <Picker.Item key={genre} label={genre} value={genre} />
            ))}
          </Picker>

          {/* 🎶 Song Selection */}
          <Text style={styles.header}>Select a Song</Text>
          <FlatList
            data={genres[selectedGenre]}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => (
              <Text style={styles.songText} onPress={() => setSelectedSong(item)}>
                🎵 {item.artist} - {item.title}
              </Text>
            )}
          />

          {/* 🎧 Audio Player (Appears when a song is selected) */}
          {selectedSong && <AudioPlayer song={selectedSong} />}

          {/* ⭐ Ratings Section */}
          <Text style={styles.header}>Rate This Song</Text>
          <RatingPicker category="Lyrics" onSelect={(category, value) => setRatings({ ...ratings, [category]: value })} />
          <RatingPicker category="Vocals" onSelect={(category, value) => setRatings({ ...ratings, [category]: value })} />
          <RatingPicker category="Mixing" onSelect={(category, value) => setRatings({ ...ratings, [category]: value })} />

          {/* 💬 Comment Section */}
          <CommentBox onCommentChange={setComment} />

          {/* ✅ Submit Rating */}
          <SubmitButton ratings={ratings} comment={comment} />

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  scrollViewContent: { padding: 20 },
  header: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
  picker: { backgroundColor: "#fff", borderRadius: 5 },
  songText: { fontSize: 16, padding: 10, backgroundColor: "#ddd", marginVertical: 5, borderRadius: 5 }
});

export default HomeScreen;
