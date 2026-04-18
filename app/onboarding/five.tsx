import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require("../../assets/bg.jpeg")} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          
          <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={20} color="#065F46" />
            </TouchableOpacity>
          </View>

          <View style={styles.centerContent}>
            <View style={styles.logoRow}>
              <View style={styles.logoContainer}>
                
                <Image 
                  source={require("../../assets/Lemon.png")} 
                  style={styles.logoIcon}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.logoText}>Hayok Credit</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.primaryButton} 
              onPress={() => router.push("/onboarding/six")}
            >
              <Text style={styles.primaryButtonText}>Get Started</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/onboarding/login")}>
              <Text style={styles.secondaryLinkText}>
                I already have an account
              </Text>
            </TouchableOpacity>
          </View>
          
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9FDEB", 
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backBtn: {
    width: 40,
    height: 40,
    backgroundColor: "#B9F4BC", 
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logoContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#065F46", 
    justifyContent: "center",
    alignItems: "center",
  },
  logoIcon: {
    width: 28,
    height: 28,
    tintColor: '#FFFFFF', 
  },
  logoText: {
    fontSize: 26,
    fontWeight: "600",
    color: "#065F46",
    letterSpacing: -0.5,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40, 
    alignItems: 'center',
  },
  primaryButton: {
    width: '100%',
    backgroundColor: "#A7F3A0", 
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#000000", 
  },
  primaryButtonText: {
    color: "#065F46",
    fontSize: 17,
    fontWeight: "600",
  },
  secondaryLinkText: {
    fontSize: 16,
    color: "#065F46",
    fontWeight: "500",
  },
});