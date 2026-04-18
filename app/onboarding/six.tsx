import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function PhoneNumberScreen() {
  const [phone, setPhone] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendCode = async () => {
    if (!phone || phone.length < 10) {
      Alert.alert("Error", "Please enter a valid phone number");
      return;
    }

    try {
      setLoading(true);

      //  FORMAT PHONE
      const formattedPhone = phone.startsWith("0")
        ? phone.slice(1)
        : phone;

      const fullPhone = `234${formattedPhone}`;

      console.log("📲 FULL PHONE:", fullPhone);

      //  SAVE PHONE BEFORE ANYTHING
      await AsyncStorage.setItem("user_phone", fullPhone);

      const confirm = await AsyncStorage.getItem("user_phone");
      console.log("SAVED PHONE:", confirm);

      if (!confirm) {
        Alert.alert("Error", "Failed to save phone");
        return;
      }

      // API CALL
      const res = await axios.post(
        "https://credit-api.hayokmedicare.ng/api/auth/send-otp",
        { phone: fullPhone }
      );

      console.log("FULL API RESPONSE:", res.data);

     
      const pinId =
        res.data?.data?.pin_id ||
        res.data?.pin_id ||
        res.data?.data?.pinId;

      if (res.data?.success || res.status === 200) {
        if (!pinId) {
          Alert.alert(
            "Error",
            "OTP sent but pin_id missing. Check API response."
          );
          return;
        }

        console.log("🚀 NAVIGATING WITH:", {
          phone: fullPhone,
          pin_id: pinId,
        });

       
        router.push({
          pathname: "/onboarding/verify",
          params: {
            phone: fullPhone,
            pin_id: String(pinId),
          },
        });
      } else {
        Alert.alert("API Error", res.data?.message || "Failed");
      }
    } catch (err: any) {
      console.log(
        " Send OTP error:",
        err.response?.data || err.message
      );

      Alert.alert(
        "Network Error",
        err.response?.data?.message || "Could not connect to server"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ImageBackground
        source={require("../../assets/bg.jpeg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.content}>
            
         
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={20} color="#065F46" />
            </TouchableOpacity>

          
            <View style={styles.header}>
              <Text style={styles.title}>Let’s begin</Text>
              <Text style={styles.subtitle}>
                Enter your phone number to create your account
              </Text>
            </View>

           
            <View style={styles.inputWrapper}>
              <View style={styles.flagContainer}>
                <Image
                  source={require("../../assets/ng.png")}
                  style={styles.flag}
                />
                <Text style={styles.countryCode}>+234</Text>
              </View>

              <TextInput
                placeholder="8012345678"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                maxLength={11}
              />
            </View>

            {/* TERMS */}
            <View style={styles.termsWrapper}>
              <Text style={styles.termsText}>
                By continuing, you agree to our{" "}
                <Text style={styles.linkText}>Terms of Service</Text> &{" "}
                <Text style={styles.linkText}>Privacy Policy</Text>
              </Text>
            </View>

            {/* BUTTON */}
            <View style={styles.footer}>
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  (loading || phone.length < 10) && { opacity: 0.6 },
                ]}
                onPress={handleSendCode}
                disabled={loading || phone.length < 10}
              >
                {loading ? (
                  <ActivityIndicator color="#065F46" />
                ) : (
                  <Text style={styles.sendButtonText}>Send Code</Text>
                )}
              </TouchableOpacity>
            </View>

          </View>
        </SafeAreaView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

// 🎨 STYLES
const styles = StyleSheet.create({
  container: { flex: 1 },

  backgroundImage: {
    flex: 1,
    width,
    height,
    backgroundColor: "#E9FDEB",
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
  },

  backBtn: {
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
    marginBottom: 30,
  },

  title: {
    fontSize: 32,
    fontWeight: "600",
    color: "#065F46",
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 16,
    color: "#065F46",
    lineHeight: 24,
    fontWeight: "500",
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 50,
    borderWidth: 1,
    borderColor: "#065F46",
    marginBottom: 20,
  },

  flagContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },

  flag: {
    width: 28,
    height: 20,
    borderRadius: 3,
  },

  countryCode: {
    marginLeft: 5,
    fontWeight: "500",
    color: "#000",
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },

  termsWrapper: {
    marginBottom: 30,
  },

  termsText: {
    fontSize: 13,
    color: "#065F46",
    lineHeight: 18,
    fontWeight: "600",
  },

  linkText: {
    textDecorationLine: "underline",
  },

  footer: {
    alignItems: "flex-end",
    marginTop: 20,
  },

  sendButton: {
    backgroundColor: "#A7F3A0",
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },

  sendButtonText: {
    color: "#065F46",
    fontWeight: "700",
    fontSize: 18,
  },
});