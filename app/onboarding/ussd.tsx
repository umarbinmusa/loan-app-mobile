import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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

export default function USSDFunding() {
  return (
    <View style={styles.mainWrapper}>
     
      <ImageBackground
        source={require("../../assets/Logo.png")} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={{ flex: 1 }}>
         
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

            
            <View style={styles.tabRow}>
              <TouchableOpacity 
                style={styles.inactiveTab} 
                onPress={() => router.push("/bank-transfer")}
              >
                <Ionicons name="home-outline" size={14} color="#9CA3AF" />
                <Text style={styles.tabTextInactive}>Bank Transfer</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.inactiveTab}
                onPress={() => router.push("/debit-card")}
              >
                <MaterialCommunityIcons name="credit-card-outline" size={14} color="#9CA3AF" />
                <Text style={styles.tabTextInactive}>Debit Card</Text>
              </TouchableOpacity>

              <View style={[styles.tab, styles.activeTab]}>
                <MaterialCommunityIcons name="cellphone-check" size={14} color="#004D25" />
                <Text style={styles.tabText}>USSD</Text>
              </View>
            </View>

           
            <View style={styles.contentCard}>
              <Text style={styles.fieldLabel}>Your Unique Account Number</Text>
              
              <View style={styles.accountBox}>
                <View style={styles.accountInfo}>
                  <View style={styles.userIconCircle}>
                    <Ionicons name="person" size={16} color="#4B5563" />
                  </View>
                  <Text style={styles.accountNameText}>Idris Audu - 2012322133</Text>
                </View>
                <TouchableOpacity activeOpacity={0.7}>
                  <Ionicons name="copy-outline" size={20} color="#9CA3AF" />
                </TouchableOpacity>
              </View>

              
              <View style={styles.infoRow}>
                <Ionicons name="information-circle" size={18} color="#004D25" />
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
    marginBottom: 24,
    fontWeight: "500",
  },
  tabRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
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
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#004D25',
  },
  tabTextInactive: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  contentCard: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  fieldLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 10,
    fontWeight: "500",
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
    marginBottom: 16,
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  userIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountNameText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
  },
  infoRow: {
    flexDirection: 'row',
    gap: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: '#004D25',
    fontWeight: '500',
    lineHeight: 18,
  },
});