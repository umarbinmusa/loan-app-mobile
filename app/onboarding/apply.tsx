import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width, height } = Dimensions.get('window');

export default function BeforeYouApply() {
  return (
    <View style={styles.container}>
      {/* 1. THE LINES - Positioned exactly like onboarding and login design */}
      <View style={styles.topBackground}>
        <Image 
          source={require("../../assets/Logo.png")} 
          style={styles.backgroundImage}
          resizeMode="cover" 
        />
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        {/* Close button aligned right */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => router.back()}
          >
            <Ionicons name="close" size={20} color="#004D25" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Illustration Section */}
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/welcome.png")}
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>

          {/* Text Content with brand colors */}
          <Text style={styles.title}>Before you apply</Text>
          <Text style={styles.subtitle}>
            We need a few more details to find{"\n"}loan offers for you.
          </Text>

          {/* Checklist card with translucency */}
          <View style={styles.checklistCard}>
            <ChecklistItem text="Phone number" checked={true} />
            <ChecklistItem text="BVN verified" checked={true} />
            <ChecklistItem text="Address verification" checked={false} />
            <ChecklistItem text="Employment & income" checked={false} />
            <ChecklistItem text="Guarantor" checked={false} />
          </View>

          {/* Right-aligned button with black border */}
          <View style={styles.buttonWrapper}>
            <TouchableOpacity 
              style={styles.completeButton} 
              onPress={() => router.push("/onboarding/address")}
            >
              <Text style={styles.buttonText}>Complete setup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

function ChecklistItem({ text, checked }: { text: string; checked: boolean }) {
  return (
    <View style={styles.itemRow}>
      <View style={[styles.checkCircle, !checked && styles.uncheckCircle]}>
        <Ionicons name="checkmark" size={14} color={checked ? "#FFFFFF" : "#A2F6AF"} />
      </View>
      <Text style={styles.itemLabel}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // White bottom half
  },
  topBackground: {
    position: 'absolute',
    top: 0,
    width: width,
    height: height * 0.45, // Exact coverage from your designs
    backgroundColor: "#D0F9D7", // Brand mint green
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8, // High visibility for the lines
  },
  header: {
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    marginTop: 10,
  },
  closeButton: {
    width: 44,
    height: 44,
    backgroundColor: "#A2F6AF", // Light green box
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  imageContainer: {
    height: height * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#004D25", // Forest Green text
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#4B5563",
    lineHeight: 22,
    marginBottom: 24,
  },
  checklistCard: {
    backgroundColor: "#F9FEFA", // Soft card background
    borderRadius: 20,
    padding: 20,
    gap: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#16A34A", // Active green check
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  uncheckCircle: {
    backgroundColor: "#E2FBE7", // Inactive check
  },
  itemLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#004D25",
  },
  buttonWrapper: {
    alignItems: "flex-end", // Bottom-right alignment
    marginTop: 20,
    marginBottom: 40,
  },
  completeButton: {
    backgroundColor: "#A2F6AF", // Brand lime green
    paddingVertical: 18,
    paddingHorizontal: 35,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#000000", // Signature black border
  },
  buttonText: {
    color: "#004D25",
    fontWeight: "800",
    fontSize: 18,
  },
});