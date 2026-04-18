import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function WithdrawFunds() {
  const [amount, setAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const isFormValid = amount.length > 0 && accountNumber.length >= 10;

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
            <Text style={styles.title}>Withdraw</Text>
            <Text style={styles.subtitle}>
              Choose how much you want to withdraw from your wallet
            </Text>

          
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Withdraw Amount</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              />
              <Text style={styles.balanceText}>Available Wallet balance: ₦125,000</Text>
            </View>

            
            <View style={styles.contentSection}>
              <Text style={styles.fieldLabel}>Bank name</Text>
              <TouchableOpacity style={styles.dropdownInput}>
                <Text style={styles.placeholderText}>Select bank</Text>
                <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
              </TouchableOpacity>

              <Text style={styles.fieldLabel}>Account number</Text>
              <TextInput
                style={styles.accountInput}
                placeholder="Enter 10-digit number"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                maxLength={10}
                value={accountNumber}
                onChangeText={setAccountNumber}
              />
            </View>

          
            <View style={styles.footer}>
              <TouchableOpacity 
                style={[
                  styles.withdrawBtn, 
                  !isFormValid && styles.withdrawBtnDisabled
                ]}
                disabled={!isFormValid}
              >
                <Text style={[
                  styles.withdrawBtnText,
                  !isFormValid && styles.withdrawBtnTextDisabled
                ]}>Withdraw</Text>
                <Ionicons 
                  name="arrow-forward" 
                  size={20} 
                  color={isFormValid ? "#004D25" : "#9CA3AF"} 
                />
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
    marginBottom: 30,
    fontWeight: "500",
    lineHeight: 20,
  },
  inputSection: { marginBottom: 25 },
  inputLabel: { fontSize: 13, color: "#6B7280", marginBottom: 8 },
  amountInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    color: "#004D25",
  },
  balanceText: { fontSize: 12, color: "#9CA3AF", marginTop: 10 },
  contentSection: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 15,
  },
  fieldLabel: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 8,
    marginTop: 15,
  },
  dropdownInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  accountInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    color: "#004D25",
  },
  placeholderText: { color: "#9CA3AF", fontSize: 14 },
  footer: { 
    marginTop: "auto", 
    marginBottom: 30, 
    alignItems: "flex-end" 
  },
  withdrawBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#A7F3A0",
    paddingVertical: 15,
    paddingHorizontal: 28,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#000000",
  },
  withdrawBtnDisabled: {
    backgroundColor: "#F3F4F6",
    borderColor: "transparent",
    borderWidth: 0,
  },
  withdrawBtnText: { 
    fontSize: 17, 
    fontWeight: "800", 
    color: "#004D25" 
  },
  withdrawBtnTextDisabled: { color: "#9CA3AF" },
});