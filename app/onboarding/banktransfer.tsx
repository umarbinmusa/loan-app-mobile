import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Clipboard,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function BankTransferFunding() {
  const [activeTab, setActiveTab] = useState("bank");
  const accountNumber = "2012322133";
  const accountName = "Idris Audu";

  const copyToClipboard = () => {
    Clipboard.setString(accountNumber);
  };

  return (
    <View style={styles.mainWrapper}>
      {/* FULL BRAND PATTERN BACKGROUND */}
      <ImageBackground
        source={require("../../assets/Logo.png")} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={{ flex: 1 }}>
          {/* Header with Close Button */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
              <Ionicons name="close" size={20} color="#004D25" />
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <Text style={styles.title}>Add Money</Text>
            <Text style={styles.subtitle}>
              Choose how you want to fund your wallet
            </Text>

            {/* Segmented Selection Tabs (Pills) */}
            <View style={styles.tabRow}>
              <TouchableOpacity 
                style={[styles.tab, activeTab === "bank" ? styles.activeTab : styles.inactiveTab]}
                onPress={() => setActiveTab("bank")}
              >
                <Ionicons name="home" size={14} color="#004D25" />
                <Text style={styles.tabText}>Bank Transfers</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.inactiveTab}>
                <MaterialCommunityIcons name="credit-card" size={14} color="#9CA3AF" />
                <Text style={styles.tabTextInactive}>Debit Card</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.inactiveTab}>
                <MaterialCommunityIcons name="cellphone" size={14} color="#9CA3AF" />
                <Text style={styles.tabTextInactive}>USSD</Text>
              </TouchableOpacity>
            </View>

            {/* Account Details Content */}
            <View style={styles.contentSection}>
              <Text style={styles.fieldLabel}>Your Unique Account Number</Text>
              
              <View style={styles.accountBox}>
                <View style={styles.accountInfo}>
                  <Ionicons name="person" size={18} color="#9CA3AF" />
                  <Text style={styles.accountDetailText}>
                    {accountName} - {accountNumber}
                  </Text>
                </View>
                <TouchableOpacity onPress={copyToClipboard}>
                  <Ionicons name="copy-outline" size={20} color="#9CA3AF" />
                </TouchableOpacity>
              </View>

              {/* Info Message Card */}
              <View style={styles.infoBox}>
                <Ionicons name="information-circle" size={20} color="#004D25" />
                <Text style={styles.infoText}>
                  Transfers to this account reflect instantly in your wallet.
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: "#DFFFE4" },
  backgroundImage: { flex: 1, width: width, height: height },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "flex-end",
  },
  closeBtn: {
    width: 40,
    height: 40,
    backgroundColor: "#B2F5C1",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  container: { flex: 1, paddingHorizontal: 20 },
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
    marginBottom: 25,
    fontWeight: "500",
  },
  tabRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  activeTab: {
    backgroundColor: '#A7F3A0',
    borderColor: '#004D25',
  },
  inactiveTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: 'transparent',
  },
  tabText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#004D25',
  },
  tabTextInactive: {
    fontSize: 11,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  contentSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Subtle white overlay
    borderRadius: 15,
  },
  fieldLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  accountBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  accountDetailText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'transparent',
    paddingVertical: 15,
    marginTop: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: '#004D25',
    fontWeight: '500',
    lineHeight: 18,
  },
});