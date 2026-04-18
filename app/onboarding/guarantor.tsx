import { gql, useMutation } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
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

const { width, height } = Dimensions.get('window');

/* ------------------ GRAPHQL MUTATION ------------------ */
const SUBMIT_GUARANTORS = gql`
  mutation SubmitGuarantors($guarantors: [GuarantorInput!]!) {
    submitGuarantors(guarantors: $guarantors) {
      success
      message
    }
  }
`;

export default function GuarantorFilled() {
  const router = useRouter();
  const [guarantors, setGuarantors] = useState([
    { relationship: "Father", fullName: "", phoneNumber: "" },
    { relationship: "Brother", fullName: "", phoneNumber: "" },
    { relationship: "Colleague", fullName: "", phoneNumber: "" },
  ]);

  const [submitGuarantors, { loading }] = useMutation(SUBMIT_GUARANTORS, {
    onCompleted: (data) => {
      if (data.submitGuarantors.success) {
        // Successful submission -> Navigate to Loans
        router.push("/onboarding/loans");
      } else {
        Alert.alert("Error", data.submitGuarantors.message || "Failed to save guarantors");
      }
    },
    onError: (error) => {
      Alert.alert("Network Error", error.message);
    }
  });

  const updateGuarantor = (index: number, field: "fullName" | "phoneNumber", value: string) => {
    const updated = [...guarantors];
    updated[index][field] = value;
    setGuarantors(updated);
  };

  const handleSubmit = () => {
    // Validation: filter out empty entries
    const filtered = guarantors
      .filter((g) => g.fullName.trim() !== "" && g.phoneNumber.trim() !== "")
      .map(({ relationship, fullName, phoneNumber }) => ({
        relationship,
        fullName,
        phoneNumber,
      }));

    if (filtered.length === 0) {
      Alert.alert("Incomplete Form", "Please provide at least one guarantor's details.");
      return;
    }

    submitGuarantors({ variables: { guarantors: filtered } });
  };

  return (
    <View style={styles.mainWrapper}>
      {/* 1. THE LINES - Absolute positioning for the background texture */}
      <View style={styles.topBackground}>
        <Image 
          source={require("../../assets/Logo.png")} 
          style={styles.backgroundImage}
          resizeMode="cover" 
        />
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
              <Ionicons name="close" size={20} color="#004D25" />
            </TouchableOpacity>
          </View>

          <ScrollView 
            contentContainerStyle={styles.container} 
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.title}>Guarantor information</Text>
            <Text style={styles.subtitle}>
              Select trusted contacts who can confirm your identity.
            </Text>

            <View style={styles.infoTag}>
              <Ionicons name="information-circle" size={14} color="#004D25" />
              <Text style={styles.infoText}>Choose up to 3 guarantors</Text>
            </View>

            {guarantors.map((g, index) => (
              <View key={index} style={styles.section}>
                <Text style={styles.sectionTitle}>
                  {index === 0 ? "1st" : index === 1 ? "2nd" : "3rd"} Guarantor
                </Text>

                <View style={styles.card}>
                  <TouchableOpacity style={styles.select}>
                    <Text style={styles.selected}>{g.relationship}</Text>
                    <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
                  </TouchableOpacity>

                  <View style={styles.inputRow}>
                    <Ionicons name="person-outline" size={18} color="#9CA3AF" />
                    <TextInput
                      placeholder="Full name"
                      style={styles.inputText}
                      value={g.fullName}
                      placeholderTextColor="#9CA3AF"
                      onChangeText={(v) => updateGuarantor(index, "fullName", v)}
                    />
                  </View>

                  <View style={[styles.inputRow, { marginBottom: 0 }]}>
                    <Ionicons name="call-outline" size={18} color="#9CA3AF" />
                    <TextInput
                      placeholder="Phone number"
                      keyboardType="phone-pad"
                      style={styles.inputText}
                      value={g.phoneNumber}
                      placeholderTextColor="#9CA3AF"
                      onChangeText={(v) => updateGuarantor(index, "phoneNumber", v)}
                    />
                  </View>
                </View>
              </View>
            ))}

            {/* 2. RIGHT ALIGNED SIGNATURE BUTTON */}
            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                style={[styles.button, loading && { opacity: 0.6 }]}
                onPress={handleSubmit}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? "Submitting..." : "View Loan Offers"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  topBackground: {
    position: 'absolute',
    top: 0,
    width: width,
    height: height * 0.45,
    backgroundColor: "#D0F9D7",
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  header: {
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    marginTop: 10,
  },
  container: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  closeBtn: {
    width: 36,
    height: 36,
    backgroundColor: "#A2F6AF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#004D25",
    marginTop: 10,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#004D25",
    opacity: 0.8,
    marginBottom: 16,
    lineHeight: 22,
  },
  infoTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(0, 77, 37, 0.1)",
  },
  infoText: {
    fontSize: 12,
    color: "#004D25",
    fontWeight: "700",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#004D25",
    marginBottom: 10,
    marginLeft: 4,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  select: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  selected: {
    fontSize: 15,
    fontWeight: "600",
    color: "#004D25",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  inputText: {
    flex: 1,
    fontSize: 15,
    color: "#004D25",
    fontWeight: "500",
  },
  buttonWrapper: {
    alignItems: "flex-end",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#A2F6AF",
    paddingVertical: 18,
    paddingHorizontal: 35,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#000000",
  },
  buttonText: {
    fontWeight: "800",
    color: "#004D25",
    fontSize: 18,
  },
});