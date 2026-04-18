import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function SecureAccount() {
  const [storedPhone, setStoredPhone] = useState<string>("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // ✅ LOAD PHONE FROM STORAGE
  useEffect(() => {
    const loadPhone = async () => {
      const phone = await AsyncStorage.getItem("user_phone");

      console.log("📦 STORED PHONE:", phone);

      if (!phone) {
        Alert.alert("Error", "Phone not found. Restart signup.");
        return;
      }

      setStoredPhone(phone);
    };

    loadPhone();
  }, []);

  // Validation
  const hasMinLength = password.length >= 8;
  const hasUpperLower = /[a-z]/.test(password) && /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const handleContinue = async () => {
    if (!storedPhone) {
      setErrorMsg("Phone missing. Restart signup.");
      return;
    }

    if (!hasMinLength || !hasUpperLower || !hasNumber || !hasSpecial) {
      setErrorMsg("Please meet all password requirements");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://credit-api.hayokmedicare.ng/api/auth/set-password",
        {
          phone_number: storedPhone,
          password: password,
          password_confirmation: confirmPassword,
        }
      );

      console.log(" RESPONSE:", res.data);

      if (res.data?.success) {
        await AsyncStorage.removeItem("user_phone");

        Alert.alert("Success", "Account created successfully");
        router.replace("/onboarding/update");
      } else {
        setErrorMsg(res.data?.message || "Something went wrong");
      }
    } catch (err: any) {
      console.log(" ERROR:", err.response?.data);

      setErrorMsg(
        err.response?.data?.message || "Server error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/bg.jpeg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <ScrollView contentContainerStyle={styles.content}>
              
             
              <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={20} color="#065F46" />
              </TouchableOpacity>

             
              <View style={styles.header}>
                <Text style={styles.title}>Secure your account</Text>
                <Text style={styles.subtitle}>
                  Create a password to protect your account
                </Text>
              </View>

              
              <View style={[styles.inputWrapper, isFocused && styles.inputActive]}>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setIsFocused(true)}
                />
                <Ionicons name="eye-off" size={20} color="#6B7280" />
              </View>

             
              {isFocused && (
                <View style={styles.requirementBox}>
                  <RequirementItem met={hasMinLength} text="Use at least 8 characters" />
                  <RequirementItem met={hasUpperLower} text="Mix uppercase & lowercase letters" />
                  <RequirementItem met={hasNumber} text="Include at least 1 number" />
                  <RequirementItem met={hasSpecial} text="Include a special character" />
                </View>
              )}

              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="Confirm password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry
                  style={styles.input}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <Ionicons name="eye-off" size={20} color="#6B7280" />
              </View>

            
              {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

             
              <View style={styles.footer}>
                <TouchableOpacity
                  style={[
                    styles.continueButton,
                    (loading || !password || !confirmPassword) && { opacity: 0.6 },
                  ]}
                  onPress={handleContinue}
                  disabled={loading}
                >
                  <Text style={styles.continueText}>
                    {loading ? "Please wait..." : "Continue"}
                  </Text>
                </TouchableOpacity>
              </View>

            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}


const RequirementItem = ({ met, text }: any) => (
  <Text style={[styles.reqText, met && styles.reqMet]}>
    {met ? "✓ " : "• "} {text}
  </Text>
);


const styles = StyleSheet.create({
  container: { flex: 1 },

  backgroundImage: {
    flex: 1,
    width,
    height,
    backgroundColor: "#E9FDEB",
  },

  content: {
    paddingHorizontal: 24,
    paddingBottom: 40,
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
    marginBottom: 16,
  },

  inputActive: {
    borderColor: "#000000",
    borderWidth: 1.5,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },

  requirementBox: {
    marginBottom: 20,
    paddingLeft: 4,
  },

  reqText: {
    fontSize: 13,
    color: "#9CA3AF",
    marginBottom: 4,
  },

  reqMet: {
    color: "#065F46",
    fontWeight: "700",
  },

  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },

  footer: {
    alignItems: "flex-end",
    marginTop: 10,
  },

  continueButton: {
    backgroundColor: "#A7F3A0",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#000000",
  },

  continueText: {
    color: "#065F46",
    fontWeight: "700",
    fontSize: 18,
  },
});