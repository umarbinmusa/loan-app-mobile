import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function LoginScreen() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ FORMAT PHONE INPUT (Removes leading 0 and non-numeric chars)
  const handlePhoneChange = (text: string) => {
    let cleaned = text.replace(/[^0-9]/g, "");
    if (cleaned.startsWith("0")) {
      cleaned = cleaned.substring(1);
    }
    setPhone(cleaned);
  };

  // 🔥 LOGIN FUNCTION
  const handleLogin = async () => {
    if (!phone || phone.length < 10) {
      Alert.alert("Error", "Please enter a valid 10-digit phone number");
      return;
    }

    if (!password) {
      Alert.alert("Error", "Password is required");
      return;
    }

    try {
      setLoading(true);

      const fullPhone = `234${phone}`;

      console.log("🔐 ATTEMPTING LOGIN:", { phone_number: fullPhone });

      const res = await axios.post(
        "https://credit-api.hayokmedicare.ng/api/auth/login",
        {
          phone_number: fullPhone,
          password: password,
        },
        {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          }
        }
      );

      console.log("✅ LOGIN RESPONSE:", res.data);

      // Extract token from various possible API structures
      const token = res.data?.token || res.data?.data?.token || res.data?.access_token;

      if (token) {
        // ✅ SAVE DATA (Using 'user_token' to match Onboarding screen)
        await AsyncStorage.multiSet([
          ["user_token", token],
          ["user_phone", fullPhone],
        ]);

        Alert.alert("Success", "Login successful");
        
        // ✅ NAVIGATE TO UPDATE PROFILE
        router.replace("/onboarding/update");
      } else {
        Alert.alert("Login Failed", "Authentication succeeded but no token was returned.");
      }
    } catch (err: any) {
      console.log("❌ LOGIN ERROR:", err.response?.data || err.message);
      
      const errorMsg = err.response?.data?.message || "Invalid phone number or password";
      Alert.alert("Login Error", errorMsg);
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
          <View style={styles.content}>
            
            {/* BACK BUTTON */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={20} color="#065F46" />
            </TouchableOpacity>

            {/* HEADER */}
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Log in to continue managing your{"\n"}loans and funds.
            </Text>

            {/* FORM */}
            <View style={styles.form}>
              
              {/* PHONE INPUT */}
              <View style={styles.inputContainer}>
                <Image
                  source={{ uri: "https://flagcdn.com/w40/ng.png" }}
                  style={styles.flagIcon}
                />
                <Text style={styles.prefix}>+234</Text>
                <TextInput
                  placeholder="Phone Number"
                  style={styles.input}
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  maxLength={10}
                  value={phone}
                  onChangeText={handlePhoneChange}
                />
              </View>

              {/* PASSWORD INPUT */}
              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color="#9CA3AF"
                  style={{ marginRight: 10 }}
                />
                <TextInput
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  style={styles.input}
                  placeholderTextColor="#9CA3AF"
                  value={password}
                  onChangeText={setPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <MaterialCommunityIcons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={22}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => Alert.alert("Coming Soon", "Password reset is under development.")}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* LOGIN BUTTON */}
            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                style={[styles.loginButton, loading && { opacity: 0.7 }]}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#065F46" size="small" />
                ) : (
                  <Text style={styles.loginText}>Login</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* FOOTER */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Don’t have an account?</Text>
              <TouchableOpacity onPress={() => router.push("/")}>
                <Text style={styles.createAccountText}>Create account</Text>
              </TouchableOpacity>
            </View>

          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: { flex: 1, width: width, height: height, backgroundColor: "#E9FDEB" },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 10 },
  backButton: {
    width: 44,
    height: 44,
    backgroundColor: "#B9F4BC",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#A7F3A0",
  },
  title: { fontSize: 28, fontWeight: "800", color: "#065F46", marginBottom: 8 },
  subtitle: { fontSize: 15, color: "#065F46", lineHeight: 22, fontWeight: "600", marginBottom: 35 },
  form: { gap: 16 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    height: 60,
    borderRadius: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  flagIcon: { width: 22, height: 16, borderRadius: 2, marginRight: 8 },
  prefix: { fontSize: 16, fontWeight: "600", color: "#374151", marginRight: 4 },
  input: { flex: 1, fontSize: 16, color: "#000", fontWeight: "500" },
  forgotText: { color: "#065F46", fontWeight: "700", fontSize: 14, marginTop: 4 },
  buttonWrapper: { alignItems: "flex-end", marginTop: 40 },
  loginButton: {
    backgroundColor: "#A7F3A0",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#000000",
    minWidth: 120,
    alignItems: "center",
  },
  loginText: { color: "#065F46", fontSize: 17, fontWeight: "700" },
  footer: { marginTop: "auto", marginBottom: 30, alignItems: "center" },
  footerText: { fontSize: 15, color: "#6B7280", marginBottom: 5 },
  createAccountText: { fontSize: 16, fontWeight: "800", color: "#065F46" },
});