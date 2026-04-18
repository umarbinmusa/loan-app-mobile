import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function DebitCardFunding() {
  const [amount, setAmount] = useState("");

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
              <TouchableOpacity style={styles.inactiveTab} onPress={() => router.back()}>
                <Ionicons name="home" size={14} color="#9CA3AF" />
                <Text style={styles.tabTextInactive}>Bank Transfer</Text>
              </TouchableOpacity>

              <View style={[styles.tab, styles.activeTab]}>
                <MaterialCommunityIcons name="credit-card" size={14} color="#004D25" />
                <Text style={styles.tabText}>Debit Card</Text>
              </View>

              <TouchableOpacity style={styles.inactiveTab}>
                <MaterialCommunityIcons name="cellphone" size={14} color="#9CA3AF" />
                <Text style={styles.tabTextInactive}>USSD</Text>
              </TouchableOpacity>
            </View>

            {/* Amount Input Section */}
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Transfer Amount</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              />
              <Text style={styles.balanceText}>Available Wallet balance: ₦50,000</Text>
            </View>

            {/* Card Details Content Section */}
            <View style={styles.contentSection}>
              <Text style={styles.fieldLabel}>Your Card Number</Text>
              
              <View style={styles.accountBox}>
                <View style={styles.accountInfo}>
                  <Image 
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg' }} 
                    style={styles.visaLogo}
                    resizeMode="contain"
                  />
                  <Text style={styles.accountDetailText}>**** **** **** **** ****</Text>
                </View>
                <TouchableOpacity>
                  <Ionicons name="copy-outline" size={20} color="#9CA3AF" />
                </TouchableOpacity>
              </View>

              <View style={styles.expiryCvvRow}>
                <View style={styles.smallInputBox}>
                  <Ionicons name="lock-closed" size={16} color="#4B5563" />
                  <Text style={styles.smallInputText}>***</Text>
                  <Ionicons name="chevron-down" size={16} color="#4B5563" />
                </View>
                
                <View style={styles.smallInputBox}>
                  <Ionicons name="calendar" size={16} color="#4B5563" />
                  <Text style={styles.smallInputText}>04/28</Text>
                </View>
              </View>

              {/* Info Message Card */}
              <View style={styles.infoBox}>
                <Ionicons name="information-circle" size={20} color="#004D25" />
                <Text style={styles.infoText}>
                  Transfers to this account reflect instantly in your wallet.
                </Text>
              </View>
            </View>

            {/* Footer Action Button */}
            <View style={styles.footer}>
              <TouchableOpacity style={styles.makePaymentBtn}>
                <Text style={styles.paymentBtnText}>Make Payment</Text>
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
    marginBottom: 20,
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
  inputSection: { marginBottom: 20 },
  inputLabel: { fontSize: 13, color: '#9CA3AF', marginBottom: 8 },
  amountInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    color: '#004D25',
  },
  balanceText: { fontSize: 12, color: '#9CA3AF', marginTop: 10 },
  contentSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)', 
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
    marginBottom: 12,
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  visaLogo: { width: 35, height: 15 },
  accountDetailText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
    letterSpacing: 1.5,
  },
  expiryCvvRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  smallInputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  smallInputText: { fontSize: 14, color: '#4B5563', fontWeight: '500' },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'transparent',
    paddingVertical: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: '#004D25',
    fontWeight: '500',
    lineHeight: 18,
  },
  footer: { 
    marginTop: 'auto', 
    marginBottom: 20, 
    alignItems: 'flex-end' 
  },
  makePaymentBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#A7F3A0',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#000000',
  },
  paymentBtnText: { 
    fontSize: 16, 
    fontWeight: '800', 
    color: '#004D25' 
  },
});