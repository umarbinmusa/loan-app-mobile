import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
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
import DropDownPicker from "react-native-dropdown-picker";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen() {
  /* ------------------ STATES ------------------ */
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState<string | null>(null);

  const [stateOpen, setStateOpen] = useState(false);
  const [stateValue, setStateValue] = useState<string | null>(null);

  const [lgaOpen, setLgaOpen] = useState(false);
  const [lgaValue, setLgaValue] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState(""); 
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [bvn, setBvn] = useState("");

  const [loading, setLoading] = useState(false);
  
  // Overlay States for the Verification Process
  const [showVerificationOverlay, setShowVerificationOverlay] = useState(false);
  const [isVerificationComplete, setIsVerificationComplete] = useState(false);

  /* ------------------ HANDLE SUBMIT ------------------ */
  const handleContinue = async () => {
    // Basic Validation
    if (!fullName || !dob || !genderValue || !email || !address || !stateValue || !lgaValue || !bvn) {
      Alert.alert("Missing Info", "Please fill all fields to continue.");
      return;
    }

    try {
      setLoading(true);
      Keyboard.dismiss(); // Hide keyboard so overlay is fully visible

      let token = await AsyncStorage.getItem("user_token");
      if (token && token.startsWith('"') && token.endsWith('"')) {
        token = token.slice(1, -1);
      }

      // Format Date to YYYY-MM-DD for the API
      let finalDob = dob;
      if (dob.includes('/')) {
        const parts = dob.split('/');
        if (parts.length === 3) {
          finalDob = `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;
        }
      }

      const response = await fetch(
        "https://credit-api.hayokmedicare.ng/api/user/update-profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json", 
            "Authorization": `Bearer ${token}`,
          },
          // Using the exact keys from your successful JSON log
          body: JSON.stringify({
            fullname: fullName,
            dob: finalDob,
            gender: genderValue,
            email: email,
            residential_address: address,
            state: stateValue,
            lga: lgaValue,
            bnv: bvn, // Note: using 'bnv' as per your API response
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setLoading(false);
        // Step 1: Show "Verifying your information"
        setShowVerificationOverlay(true); 

        // Wait for 15 seconds as requested
        setTimeout(() => {
          // Step 2: Show "Verification complete"
          setIsVerificationComplete(true); 

          
          setTimeout(() => {
            setShowVerificationOverlay(false);
            setIsVerificationComplete(false);
            router.push("/onboarding/homeScreen"); 
          }, 2000); 
        }, 15000); 
      } else {
        setLoading(false);
        Alert.alert("Update Error", data.message || "Could not update profile.");
      }

    } catch (error) {
      setLoading(false);
      Alert.alert("Connection Error", "Check your internet connection.");
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
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
            >
              <Text style={styles.title}>Tell us about you</Text>

              
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Full name"
                  placeholderTextColor="#9CA3AF"
                  style={styles.textInput}
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>

              <View style={[styles.row, { zIndex: 3000 }]}>
                <View style={[styles.inputContainer, styles.half]}>
                  <Ionicons name="calendar-outline" size={18} color="#6B7280" style={{ marginRight: 8 }} />
                  <TextInput
                    placeholder="MM/DD/YYYY"
                    placeholderTextColor="#9CA3AF"
                    style={styles.textInput}
                    value={dob}
                    onChangeText={setDob}
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.half}>
                  <DropDownPicker
                    open={genderOpen}
                    value={genderValue}
                    items={[
                      { label: "Male", value: "male" },
                      { label: "Female", value: "female" },
                    ]}
                    setOpen={setGenderOpen}
                    setValue={setGenderValue}
                    placeholder="Gender"
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownContainer}
                    listMode="SCROLLVIEW"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Email Address"
                  placeholderTextColor="#9CA3AF"
                  style={styles.textInput}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={[styles.inputContainer, styles.addressInput]}>
                <TextInput
                  placeholder="Residential Address"
                  placeholderTextColor="#9CA3AF"
                  style={styles.textInput}
                  value={address}
                  onChangeText={setAddress}
                  multiline
                />
              </View>

              <View style={[styles.row, { zIndex: 2000 }]}>
                <View style={styles.half}>
                  <DropDownPicker
                    open={stateOpen}
                    value={stateValue}
                    items={[
                      { label: "Lagos", value: "lagos" },
                      { label: "Kano", value: "kano" },
                      { label: "FCT", value: "fct" },
                    ]}
                    setOpen={setStateOpen}
                    setValue={setStateValue}
                    placeholder="State"
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownContainer}
                    listMode="SCROLLVIEW"
                  />
                </View>

                <View style={styles.half}>
                  <DropDownPicker
                    open={lgaOpen}
                    value={lgaValue}
                    items={[
                      { label: "Ikeja", value: "ikeja" },
                      { label: "AMAC", value: "amac" },
                    ]}
                    setOpen={setLgaOpen}
                    setValue={setLgaValue}
                    placeholder="L.G.A"
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownContainer}
                    listMode="SCROLLVIEW"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="BVN"
                  placeholderTextColor="#9CA3AF"
                  style={styles.textInput}
                  value={bvn}
                  onChangeText={setBvn}
                  keyboardType="number-pad"
                  maxLength={11}
                />
              </View>

              <View style={styles.footer}>
                <TouchableOpacity
                  style={[styles.continueButton, loading && { opacity: 0.7 }]}
                  onPress={handleContinue}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#065F46" />
                  ) : (
                    <Text style={styles.continueText}>Continue</Text>
                  )}
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>

        
        {showVerificationOverlay && (
          <View style={styles.fullOverlay}>
            <View style={styles.whiteBox}>
              {!isVerificationComplete ? (
                
                <>
                  <View style={styles.logoContainer}>
                    <Image 
                      source={require("../../assets/Lemon.png")} 
                      style={styles.logoImage}
                      resizeMode="contain"
                    />
                  </View>
                  <Text style={styles.verifyingTitle}>Verifying your information</Text>
                  <Text style={styles.verifyingSubtitle}>Please don't close this screen.</Text>
                  <ActivityIndicator size="large" color="#4ADE80" style={{ marginTop: 20 }} />
                </>
              ) : (
              
                <>
                  <View style={[styles.logoContainer, { backgroundColor: '#F0FFF4' }]}>
                    <Ionicons name="checkmark-circle" size={80} color="#4ADE80" />
                  </View>
                  <Text style={styles.verifyingTitle}>Verification complete</Text>
                  <Text style={styles.verifyingSubtitle}>You will be redirected shortly.</Text>
                </>
              )}
            </View>
          </View>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: { flex: 1, width, height, backgroundColor: "#E9FDEB" },
  scrollContent: { paddingHorizontal: 24, paddingTop: 40, paddingBottom: 60 },
  title: { fontSize: 28, fontWeight: "500", color: "#065F46", marginBottom: 24 },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  addressInput: { height: 55, alignItems: "flex-start", paddingTop: 12 },
  textInput: { flex: 1, fontSize: 15, color: "#000", fontWeight: "400" },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16 },
  half: { width: "48%", height: 50},
  dropdown: { backgroundColor: "#FFFFFF", borderColor: "#E5E7EB", borderRadius: 12, height: 50 },
  dropdownContainer: { borderColor: "#E5E7EB" },
  footer: { alignItems: "flex-end", marginTop: 60 },
  continueButton: {
    backgroundColor: "#A7F3A0",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#000000",
  },
  continueText: { color: "#065F46", fontWeight: "700", fontSize: 18 },

  
  fullOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)', 
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  whiteBox: {
    width: width * 0.85,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  logoContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#F0FFF4', 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: 80,
    height: 80,
  },
  verifyingTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  verifyingSubtitle: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
  },
});