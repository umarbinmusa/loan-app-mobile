import { Ionicons } from "@expo/vector-icons";
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

export default function ResetPasswordScreen() {
  const [phone, setPhone] = useState("");

  const handlePhoneChange = (text: string) => {
    // Basic cleaning to allow only numbers
    let cleaned = text.replace(/[^0-9]/g, "");
    if (cleaned.startsWith("0")) {
      cleaned = cleaned.substring(1);
    }
    setPhone(cleaned);
  };

  const handleSendCode = () => {
    // Logic to send reset code
    console.log("Sending code to:", phone);
    ; 
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/bg.jpeg")} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.content}>
            
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={20} color="#065F46" />
            </TouchableOpacity>

            
            <View style={styles.header}>
              <Text style={styles.title}>Reset your password</Text>
              <Text style={styles.subtitle}>
                Enter your phone number to reset{"\n"}your password.
              </Text>
            </View>

            
            <View style={styles.inputWrapper}>
              <Image 
                source={{ uri: 'https://flagcdn.com/w40/ng.png' }} 
                style={styles.flagIcon} 
              />
              <TextInput
                placeholder="Phone Number"
                placeholderTextColor="#9CA3AF"
                style={styles.input}
                keyboardType="numeric"
                maxLength={10}
                value={phone}
                onChangeText={handlePhoneChange}
              />
            </View>

            
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.sendButton} 
                onPress={handleSendCode}
              >
                <Text style={styles.sendButtonText}>Send Code</Text>
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
    paddingTop: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    backgroundColor: "#B9F4BC",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#065F46",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#065F46",
    fontWeight: "600",
    lineHeight: 22,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 60,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 24,
  },
  flagIcon: {
    width: 22,
    height: 16,
    borderRadius: 2,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
  buttonContainer: {
    alignItems: "flex-end",
  },
  sendButton: {
    backgroundColor: "#A7F3A0",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#000000",
  },
  sendButtonText: {
    color: "#065F46",
    fontWeight: "700",
    fontSize: 17,
  },
});