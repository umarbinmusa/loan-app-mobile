import { Ionicons } from '@expo/vector-icons';
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
  View
} from "react-native";

const { width, height } = Dimensions.get('window');

export default function OnboardingThree() {
  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require("../../assets/bg.jpeg")} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.content}>
            
            
            <View style={styles.header}>
              <View style={styles.progressBarBackground}>
                <View style={[styles.progressBarActive, { width: '100%' }]} />
              </View>
              
              <TouchableOpacity 
                style={styles.skipButton} 
                onPress={() => router.replace("/onboarding/login")}
              >
                <Text style={styles.skipText}>Skip</Text>
              </TouchableOpacity>
            </View>

           
            <View style={styles.imageContainer}>
              <Image
                source={require("../../assets/onboarding1.png")} 
                style={styles.image}
                resizeMode="contain"
              />
            </View>

         
            <View style={styles.textWrapper}>
              <Text style={styles.title}>
                Reliable support{"\n"}when it matters
              </Text>

              <Text style={styles.subtitle}>
                Your data security is our priority. Experience a seamless financial journey with no hidden fees and total transparency.
              </Text>
            </View>


            <View style={styles.footer}>
              <TouchableOpacity 
                style={styles.continueButton} 
                onPress={() => router.replace("/onboarding/two")} 
              >
                <Text style={styles.buttonText}>Get Started</Text>
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
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: "#E9FDEB", 
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  progressBarBackground: {
    height: 8,
    width: width * 0.5,
    backgroundColor: "rgba(6, 95, 70, 0.1)", 
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBarActive: {
    height: '100%',
    backgroundColor: "#22C55E", 
    borderRadius: 10,
  },
  skipButton: {
    backgroundColor: "#B9F4BC", 
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
  },
  skipText: {
    color: "#065F46",
    fontWeight: "700",
    fontSize: 14,
  },
  imageContainer: {
    height: height * 0.35,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },
  image: {
    width: "90%",
    height: "100%",
  },
  textWrapper: {
    marginTop: 30, 
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#065F46",
    lineHeight: 30,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#000000",
    lineHeight: 24,
    fontWeight: "500",
    opacity: 0.8,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    right: 24, 
  },
  continueButton: {
    flexDirection: "row",
    backgroundColor: "#A7F3A0", 
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#065F46",
    fontWeight: "700",
    fontSize: 18,
    marginRight: 8,
  },
});