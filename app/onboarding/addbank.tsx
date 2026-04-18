import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Dimensions,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function AddBankAccount() {
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");

  const handleSave = () => {
    // Logic to save bank details would go here
    router.back();
  };

  return (
    <View style={styles.mainWrapper}>
      {/* BRAND BACKGROUND */}
      <View style={styles.topBackground}>
        <Image
          source={require("../../assets/Logo.png")}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        {/* Header with Close Button */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
            <Ionicons name="close" size={20} color="#004D25" />
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>Add Bank account</Text>
          <Text style={styles.subtitle}>Where should funds be paid?</Text>

          {/* Form Fields */}
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Account number"
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
              maxLength={10}
              value={accountNumber}
              onChangeText={setAccountNumber}
            />

            <TouchableOpacity style={styles.dropdown}>
              <Text style={[styles.dropdownText, !bankName && { color: "#9CA3AF" }]}>
                {bankName || "Bank name"}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          {/* Save Button - Right aligned with signature border */}
          <View style={styles.footer}>
            <TouchableOpacity 
              style={[styles.saveButton, !accountNumber && { opacity: 0.6 }]} 
              onPress={handleSave}
              disabled={!accountNumber}
            >
              <Text style={styles.saveText}>Save Account</Text>
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
    alignItems: 'flex-end',
  },
  closeBtn: {
    width: 44,
    height: 44,
    backgroundColor: "#A2F6AF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  container: { flex: 1, paddingHorizontal: 24 },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#004D25",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#004D25",
    opacity: 0.8,
    marginTop: 6,
    marginBottom: 30,
  },
  inputGroup: {
    gap: 15,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    color: "#004D25",
    fontWeight: "500",
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  dropdownText: {
    fontSize: 16,
    color: "#004D25",
    fontWeight: "500",
  },
  footer: {
    marginTop: 40,
    alignItems: "flex-end",
  },
  saveButton: {
    backgroundColor: "#A2F6AF",
    paddingVertical: 18,
    paddingHorizontal: 35,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#000000",
  },
  saveText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#004D25",
  },
});