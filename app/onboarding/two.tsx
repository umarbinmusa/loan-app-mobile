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

export default function OnboardingTwo() {
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
              <View style={styles.progressTrack}>
                <View style={[styles.progressActive, { width: '66%' }]} />
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
                source={require("../../assets/onboarding2.png")}
                style={styles.illustration}
                resizeMode="contain"
              />
            </View>

            
            <View style={styles.textWrapper}>
              <Text style={styles.title}>
                Clear terms.{"\n"}No hidden charges.
              </Text>
              <Text style={styles.subtitle}>
                You’ll always see your loan amount, interest, and repayment date before you apply.
              </Text>
            </View>

            <View style={styles.footer}>
              <TouchableOpacity 
                style={styles.continueButton} 
                onPress={() => router.push("/onboarding/three")}
              >
                <Text style={styles.buttonText}>Continue</Text>
                <Ionicons name="arrow-forward" size={22} color="#065F46" />
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
  progressTrack: {
    height: 8,
    width: width * 0.45,
    backgroundColor: "rgba(6, 95, 70, 0.1)", 
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressActive: {
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
    marginTop: 40,
  },
  illustration: {
    width: "90%",
    height: "100%",
  },
  textWrapper: {
    marginTop: 30, 
  },
  title: {
    fontSize: 25,
    fontWeight: "500",
    color: "#065F46", 
    lineHeight: 40,
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