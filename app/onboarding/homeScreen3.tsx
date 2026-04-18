

import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Screen() {
  return (
    <View style={styles.container}>
      
      <Image
        source={require("../../assets/bg.jpeg")}
        style={styles.backgroundImage}
        resizeMode="contain"
      />
      

      <View style={styles.content}>
        <Text>Hello World</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});