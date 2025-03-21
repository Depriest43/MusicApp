import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const RatingPicker = ({ category, onSelect }) => {
  const [selectedValue, setSelectedValue] = useState(0); // ✅ Start from 0

  const handleValueChange = (value) => {
    const numericValue = Number(value); // ✅ Convert to number
    setSelectedValue(numericValue);
    if (typeof onSelect === "function") {
      onSelect(category, numericValue);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label} accessibilityRole="header">
        {category} Rating:
      </Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={handleValueChange}
          style={styles.picker}
          accessibilityLabel={`${category} Rating Picker`}
          accessibilityRole="adjustable"
        >
          {[0, 1, 2, 3, 4, 5].map((num) => (
            <Picker.Item key={num} label={num.toString()} value={num} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { margin: 10 },
  label: { color: "#333333", fontSize: 16, marginBottom: 5 },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#005A87",
    borderRadius: 5,
    backgroundColor: "#F5F5F5",
  },
  picker: { height: 40 },
});

export default RatingPicker;
