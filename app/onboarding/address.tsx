import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function AddressVerification() {
  const [address, setAddress] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [lga, setLga] = useState("");
  const [utilityBillUrl, setUtilityBillUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const uploadUtilityBill = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required", "Allow gallery access");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (result.canceled) return;

    const image = result.assets[0];
    setFileName(image.uri.split("/").pop() || "bill.jpg");

    setUploading(true);
    setTimeout(() => {
      setUtilityBillUrl(image.uri);
      setUploading(false);
    }, 1500);
  };

  const handleSubmit = async () => {
    if (!address || !stateValue || !lga || !utilityBillUrl) {
      Alert.alert("Error", "Please complete all fields");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      router.push("/onboarding/employment");
    }, 1200);
  };

  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={require("../../assets/bg.jpeg")}
        style={styles.bg}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
              contentContainerStyle={styles.container}
              showsVerticalScrollIndicator={false}
            >
              {/* HEADER */}
              <View style={styles.header}>
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => router.back()}
                >
                  <Ionicons name="close" size={18} color="#065F46" />
                </TouchableOpacity>
              </View>

              {/* TITLE */}
              <Text style={styles.title}>Address verification</Text>
              <Text style={styles.subtitle}>
                Upload a recent utility bill to confirm{"\n"}your residence.
              </Text>

              {/* INPUTS */}
              <View style={styles.inputs}>
                <TextInput
                  placeholder="Residential Address"
                  placeholderTextColor="#9CA3AF"
                  style={styles.input}
                  value={address}
                  onChangeText={setAddress}
                />

                <View style={styles.row}>
                  <View style={styles.half}>
                    <TextInput
                      placeholder="State"
                      placeholderTextColor="#9CA3AF"
                      style={styles.input}
                      value={stateValue}
                      onChangeText={setStateValue}
                    />
                    <Ionicons
                      name="chevron-down"
                      size={16}
                      color="#6B7280"
                      style={styles.dropdownIcon}
                    />
                  </View>

                  <View style={styles.half}>
                    <TextInput
                      placeholder="L.G.A"
                      placeholderTextColor="#9CA3AF"
                      style={styles.input}
                      value={lga}
                      onChangeText={setLga}
                    />
                    <Ionicons
                      name="chevron-down"
                      size={16}
                      color="#6B7280"
                      style={styles.dropdownIcon}
                    />
                  </View>
                </View>
              </View>

              {/* UPLOAD CARD */}
              <TouchableOpacity
                style={styles.uploadBox}
                onPress={uploadUtilityBill}
                disabled={uploading}
              >
                {uploading ? (
                  <ActivityIndicator color="#065F46" />
                ) : (
                  <>
                    <Ionicons
                      name="folder-open"
                      size={26}
                      color="#4ADE80"
                    />
                    <Text style={styles.uploadText}>
                      {utilityBillUrl ? fileName : "Upload File"}
                    </Text>
                  </>
                )}
              </TouchableOpacity>

              {/* INFO */}
              <View style={styles.info}>
                <View style={styles.infoDot}>
                  <Ionicons name="information" size={12} color="#FFF" />
                </View>
                <Text style={styles.infoText}>
                  Upload a recent utility bill (Electricity, Water, Internet)
                  issued within the last 3 months.
                </Text>
              </View>

              {/* BUTTON */}
              <View style={styles.buttonWrap}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleSubmit}
                  disabled={submitting || uploading}
                >
                  <Text style={styles.buttonText}>
                    {submitting ? "Processing..." : "Continue"}
                  </Text>
                  {!submitting && (
                    <Ionicons
                      name="arrow-forward"
                      size={18}
                      color="#064E3B"
                    />
                  )}
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

/* STYLES */

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#DCFCE7",
  },

  bg: {
    flex: 1,
  },

  container: {
    paddingHorizontal: 22,
    paddingBottom: 40,
  },

  header: {
    alignItems: "flex-end",
    marginTop: 10,
    marginBottom: 10,
  },

  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#86EFAC",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#064E3B",
    marginTop: 10,
  },

  subtitle: {
    fontSize: 14,
    color: "#065F46",
    marginTop: 6,
    lineHeight: 20,
  },

  inputs: {
    marginTop: 25,
    gap: 14,
  },

  input: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: "#111827",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  half: {
    width: "48%",
    justifyContent: "center",
  },

  dropdownIcon: {
    position: "absolute",
    right: 12,
  },

  uploadBox: {
    marginTop: 20,
    backgroundColor: "#F3F4F6",
    borderRadius: 14,
    paddingVertical: 28,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  uploadText: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "600",
    color: "#065F46",
  },

  info: {
    flexDirection: "row",
    marginTop: 15,
    gap: 8,
    alignItems: "flex-start",
  },

  infoDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#065F46",
    justifyContent: "center",
    alignItems: "center",
  },

  infoText: {
    fontSize: 12,
    color: "#065F46",
    flex: 1,
    lineHeight: 16,
  },

  buttonWrap: {
    alignItems: "flex-end",
    marginTop: 30,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#86EFAC",
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#064E3B",
  },

  buttonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#064E3B",
  },
});