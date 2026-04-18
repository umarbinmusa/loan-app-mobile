import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      
      <ImageBackground
        source={require("../../assets/welcome.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            
            <View style={styles.textWrapper}>
              <Text style={styles.title}>Welcome to{"\n"}Hayok Credit</Text>
              <Text style={styles.subtitle}>
                Let’s get to know you so we can offer you the best loan options.
              </Text>
            </View>

            
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/onboarding/update")}
              >
                <Text style={styles.buttonText}>Continue</Text>
                <Ionicons name="arrow-forward" size={20} color="#004D25" />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "flex-end", 
    paddingBottom: 40,
  },
  textWrapper: {
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFFFFF",
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    color: "#FFFFFF",
    marginTop: 12,
    opacity: 0.9,
    lineHeight: 24,
    fontWeight: "500",
  },
  footer: {
    alignItems: "flex-end", // Aligns the button to the right
  },
  button: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 10,
    // Shadow for the button
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#004D25",
    fontSize: 16,
    fontWeight: "800",
  },
});