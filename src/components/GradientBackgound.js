import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const GradientBackground = () => {
  return (
    <LinearGradient
      colors={["#FF5733", "#FFC300", "#DAF7A6"]} // Define gradient colors
      style={styles.gradient}
    >
      <Text style={styles.text}>Gradient Background</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
});

export default GradientBackground;
