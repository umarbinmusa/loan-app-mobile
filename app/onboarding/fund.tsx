import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Dimensions,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function FundDestination() {
  const [selectedDestination, setSelectedDestination] = useState("wallet");

  return (
    <View style={styles.mainWrapper}>
      {/* BRAND BACKGROUND - Curved lines */}
      <View style={styles.topBackground}>
        <Image
          source={require("../../assets/Logo.png")}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={20} color="#004D25" />
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>Where should we send your funds</Text>
          <Text style={styles.subtitle}>Choose an account to receive your loan</Text>

          {/* Wallet Option Card */}
          <TouchableOpacity
            style={[
              styles.card,
              selectedDestination === "wallet" && styles.cardActive,
            ]}
            onPress={() => setSelectedDestination("wallet")}
          >
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.walletName}>Hayok Wallet</Text>
                <Text style={styles.walletDesc}>Instant credit • No transfer fee</Text>
              </View>
              {/* Radio Indicator */}
              <View style={[styles.radio, selectedDestination === "wallet" && styles.radioActive]}>
                {selectedDestination === "wallet" && <View style={styles.radioInner} />}
              </View>
            </View>
            
            <View style={styles.tagContainer}>
              <View style={styles.recommendedTag}>
                <Text style={styles.recommendedText}>Recommended</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Add Bank Account Option - Updated with Navigation */}
<TouchableOpacity 
  style={styles.addBankButton}
  onPress={() => router.push("/onboarding/addbank")} // Ensure this path matches your file structure
>
  <View style={styles.addIconContainer}>
    <Ionicons name="add" size={20} color="#FFFFFF" />
  </View>
  <Text style={styles.addBankText}>Add Bank Account</Text>
</TouchableOpacity>

          {/* Receive Funds Button - Right aligned with black border */}
          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.receiveButton}
              onPress={() => console.log("Processing loan to:", selectedDestination)}
            >
              <Text style={styles.receiveText}>Receive Funds</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: "#FFFFFF" },
  topBackground: {
    position: "absolute",
    top: 0,
    width: width,
    height: height * 0.45,
    backgroundColor: "#D0F9D7",
  },
  backgroundImage: { width: "100%", height: "100%", opacity: 0.7 },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    width: 44,
    height: 44,
    backgroundColor: "#A2F6AF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  container: { flex: 1, paddingHorizontal: 20 },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#004D25",
    marginTop: 10,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 16,
    color: "#004D25",
    opacity: 0.8,
    marginTop: 8,
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 25,
  },
  cardActive: {
    borderColor: "#16A34A",
    borderWidth: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  walletName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#004D25",
  },
  walletDesc: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
  },
  radioActive: {
    borderColor: "#16A34A",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#16A34A",
  },
  tagContainer: {
    marginTop: 15,
  },
  recommendedTag: {
    backgroundColor: "#FFEDD5", // Light orange tag
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  recommendedText: {
    color: "#F97316",
    fontSize: 12,
    fontWeight: "700",
  },
  addBankButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 10,
  },
  addIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#004D25",
    justifyContent: "center",
    alignItems: "center",
  },
  addBankText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#004D25",
  },
  footer: {
    marginTop: "auto",
    marginBottom: 40,
    alignItems: "flex-end",
  },
  receiveButton: {
    backgroundColor: "#A2F6AF",
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#000000",
  },
  receiveText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#004D25",
  },
});