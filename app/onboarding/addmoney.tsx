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

const { width, height } = Dimensions.get("window");

export default function AddMoneySelection() {
  const options = [
    { id: "bank", label: "Bank Transfer", route: "/onboarding/banktransfer" },
    { id: "card", label: "Debit Card", route: "/onboarding/card" },
    { id: "ussd", label: "USSD", route: "/onboarding/ussd" },
  ];

  return (
    <View style={styles.mainWrapper}>
      {/* FULL BRAND PATTERN BACKGROUND */}
      <ImageBackground
        source={require("../../assets/Logo.png")} // Ensure this is your light green pattern
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={{ flex: 1 }}>
          {/* Header with Close Button on the Right */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.closeBtn} 
              onPress={() => router.back()}
            >
              <Ionicons name="close" size={20} color="#004D25" />
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <Text style={styles.title}>Add Money</Text>
            <Text style={styles.subtitle}>
              Choose how you want to fund your wallet
            </Text>

            {/* Funding Options */}
            <View style={styles.optionsContainer}>
              {options.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.optionCard}
                  onPress={() => router.push(item.route)}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { 
    flex: 1, 
    backgroundColor: "#DFFFE4" // Match the base mint color
  },
  backgroundImage: { 
    flex: 1, 
    width: width, 
    height: height 
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "flex-end",
  },
  closeBtn: {
    width: 40,
    height: 40,
    backgroundColor: "#B2F5C1", // Exact mint shade from image
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  container: { 
    flex: 1, 
    paddingHorizontal: 20 
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#004D25",
    marginTop: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#004D25",
    opacity: 0.9,
    marginTop: 8,
    marginBottom: 30,
    fontWeight: "500",
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    backgroundColor: "transparent", // Changed from #FFFFFF to transparent
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: "center",
    borderWidth: 1, // Ensures the border is visible
    borderColor: "#E5E7EB", // Adjust this shade to match the exact border in the image
    marginBottom: 12, // Spacing between the transparent cards
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#004D25",
  },
});