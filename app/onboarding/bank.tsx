import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function BankAccountScreen() {
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  // Check if fields are filled to enable the button
  const isFormValid = bankName.length > 0 && accountNumber.length === 10;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* Header Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <Ionicons name="close" size={20} color="#065F46" />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.title}>Bank account</Text>
          <Text style={styles.subtitle}>Where should funds be paid?</Text>

          {/* Bank Selection Placeholder (You can replace with a Modal/Picker) */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Bank name"
              value={bankName}
              onChangeText={setBankName}
              placeholderTextColor="#9CA3AF"
            />
            <Ionicons 
              name="chevron-down" 
              size={18} 
              color="#9CA3AF" 
              style={styles.inputIcon} 
            />
          </View>

          {/* Account Number Input */}
          <TextInput
            style={styles.input}
            placeholder="Account number"
            value={accountNumber}
            onChangeText={setAccountNumber}
            keyboardType="number-pad"
            maxLength={10}
            placeholderTextColor="#9CA3AF"
          />

          {/* Continue Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                !isFormValid && styles.buttonDisabled
              ]}
              disabled={!isFormValid}
              onPress={() => router.push("/next-screen")} // Update with your route
            >
              <Text style={[
                styles.buttonText,
                !isFormValid && styles.buttonTextDisabled
              ]}>
                Continue
              </Text>
              <Ionicons 
                name="arrow-forward" 
                size={18} 
                color={isFormValid ? "#065F46" : "#9CA3AF"} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECFDF5", // Light mint background
  },
  closeButton: {
    alignSelf: "flex-end",
    backgroundColor: "#D1FAE5",
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginRight: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#065F46",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 32,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: "#1F2937",
    marginBottom: 16,
    width: "100%",
    // Subtle border to match screenshot
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  inputIcon: {
    position: "absolute",
    right: 16,
    top: 18,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center", // Matches the vertical centering in your image
    alignItems: "flex-end",
  },
  button: {
    backgroundColor: "#A7F3D0",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#065F46",
  },
  buttonDisabled: {
    backgroundColor: "#F3F4F6",
    borderColor: "transparent",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#065F46",
    marginRight: 8,
  },
  buttonTextDisabled: {
    color: "#9CA3AF",
  },
});