import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  ImageBackground,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function VerifyNumberScreen() {
  const router = useRouter();
  const { phone, pin_id } = useLocalSearchParams();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(23);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const inputs = useRef<TextInput[]>([]);
  const popAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text.slice(-1);
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    } else if (text && index === 5) {
      Keyboard.dismiss();
      handleVerify(newOtp.join(""));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (finalOtp: string) => {
    try {
      setLoading(true);
      Keyboard.dismiss(); // Ensure keyboard goes away immediately

      const cleanPhone = Array.isArray(phone) ? phone[0] : phone;
      const cleanPinId = Array.isArray(pin_id) ? pin_id[0] : pin_id;

      const res = await axios.post(
        "https://credit-api.hayokmedicare.ng/api/auth/verify-otp",
        {
          phone: cleanPhone,
          pin: finalOtp,
          pin_id: cleanPinId,
        }
      );

      // FIX: Checking for status "success" as seen in your console
      if (res.data?.status === "success" || res.data?.success === true) {
        await AsyncStorage.setItem("user_phone", String(cleanPhone));

        setLoading(false);
        setShowSuccess(true);

        // Start Animation
        Animated.spring(popAnim, {
          toValue: 1,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }).start();

        // Stay for 10 seconds as requested
        setTimeout(() => {
          router.replace("/onboarding/secure");
        }, 10000);
      } else {
        setLoading(false);
        Alert.alert("Error", res.data?.message || "Invalid OTP");
      }
    } catch (err: any) {
      setLoading(false);
      Alert.alert("Error", "Verification failed");
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
            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={20} color="#065F46" />
            </TouchableOpacity>

            <View style={styles.header}>
              <Text style={styles.title}>Verify your number</Text>
              <Text style={styles.subtitle}>
                Enter the 6-digit code sent to your phone.
              </Text>
            </View>

            <View style={styles.otpRow}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  style={[
                    styles.otpInput,
                    focusedIndex === index && styles.otpActive,
                  ]}
                  keyboardType="number-pad"
                  maxLength={1}
                  ref={(ref) => (inputs.current[index] = ref as TextInput)}
                  value={digit}
                  onFocus={() => setFocusedIndex(index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  editable={!showSuccess}
                />
              ))}
            </View>

            <View style={{ alignItems: "center" }}>
              {loading ? (
                <ActivityIndicator size="large" color="#065F46" />
              ) : (
                !showSuccess && (
                  <TouchableOpacity disabled={timer > 0} style={styles.resendArea}>
                    <Text style={[styles.resendText, timer === 0 && styles.resendActive]}>
                      Resend code {timer > 0 && <Text style={styles.timerText}>({timer})</Text>}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          </View>
        </SafeAreaView>

        
        {showSuccess && (
          <View style={styles.fullOverlay}>
            <Animated.View
              style={[
                styles.outerPulse,
                { transform: [{ scale: popAnim }], opacity: popAnim },
              ]}
            >
              <View style={styles.innerPulse}>
                <Ionicons name="checkmark-circle" size={110} color="#32D74B" />
              </View>
            </Animated.View>
          </View>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  backgroundImage: { width, height, position: "absolute" },
  content: { flex: 1, paddingHorizontal: 24 },
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
  header: { marginBottom: 30 },
  title: { fontSize: 28, fontWeight: "500", color: "#065F46", marginBottom: 8 },
  subtitle: { fontSize: 15, color: "#065F46", fontWeight: "600", opacity: 0.9 },
  otpRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 40 },
  otpInput: {
    width: (width - 90) / 6,
    height: 64,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  otpActive: { borderColor: "#065F46", borderWidth: 1.5 },
  resendArea: { marginTop: 20 },
  resendText: { color: "#9CA3AF", fontWeight: "700", fontSize: 16 },
  resendActive: { color: "#065F46" },
  timerText: { color: "#065F46" },

  
  fullOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: "rgba(255, 255, 255, 0.8)", 
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    elevation: 20,
  },
  outerPulse: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(50, 215, 75, 0.12)",
    justifyContent: "center",
    alignItems: "center",
  },
  innerPulse: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(50, 215, 75, 0.18)",
    justifyContent: "center",
    alignItems: "center",
  },
});