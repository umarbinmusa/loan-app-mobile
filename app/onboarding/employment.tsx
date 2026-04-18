import { gql, useMutation } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get('window');

/* ================= GRAPHQL ================= */
const SUBMIT_EMPOWERMENT = gql`
  mutation SubmitEmpowerment($empowermentInformation: String!, $occupation: String!, $education: String!, $monthlyIncome: String!) {
    submitEmpowerment(empowermentInformation: $empowermentInformation, occupation: $occupation, education: $education, monthlyIncome: $monthlyIncome) {
      success
      message
    }
  }
`;

/* ================= DROPDOWN OPTIONS ================= */
const occupations = ["Agriculture", "Manufacturing", "Banking/Financial Service", "Construction", "Consulting/Professional Service", "General Merchant/Trade", "Education", "Entertainment and Media", "Oil and Gas", "Fashion/Apparel", "Hospitality/Tourism", "Logistics/Transportation", "Information Technology", "Civil Servant"];
const educations = ["Postgraduate", "Degree", "Secondary", "Primary", "Diploma or Equivalent", "No Formal Education"];
const employments = ["Self-employed", "Private Sector", "Civil/Public Servant", "NYSC", "Student", "Unemployed", "Retired"];
const incomes = ["0 - 25000", "25001 - 50000", "50001 - 100000", "100001 - 200000", "200001 - 500000", "500001 - 1000000", "1000000+"];

export default function EmploymentIncome() {
  const [employmentInfo, setEmploymentInfo] = useState("");
  const [occupation, setOccupation] = useState("");
  const [education, setEducation] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalOptions, setModalOptions] = useState<string[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<"employment" | "occupation" | "education" | "income" | null>(null);

  const [submitEmpowerment, { loading }] = useMutation(SUBMIT_EMPOWERMENT);

  const handleSubmit = async () => {
    if (!employmentInfo || !occupation || !education || !monthlyIncome) {
      Alert.alert("Error", "Complete all fields");
      return;
    }
    try {
      const { data } = await submitEmpowerment({
        variables: { empowermentInformation: employmentInfo, occupation, education, monthlyIncome },
      });
      if (data?.submitEmpowerment?.success) {
        router.push("/onboarding/guarantor");
      }
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  const openDropdown = (type: "employment" | "occupation" | "education" | "income") => {
    setActiveDropdown(type);
    if (type === "employment") setModalOptions(employments);
    else if (type === "occupation") setModalOptions(occupations);
    else if (type === "education") setModalOptions(educations);
    else if (type === "income") setModalOptions(incomes);
    setModalVisible(true);
  };

  const selectOption = (option: string) => {
    if (activeDropdown === "employment") setEmploymentInfo(option);
    else if (activeDropdown === "occupation") setOccupation(option);
    else if (activeDropdown === "education") setEducation(option);
    else if (activeDropdown === "income") setMonthlyIncome(option);
    setModalVisible(false);
  };

  const renderDropdown = (label: string, value: string, type: "employment" | "occupation" | "education" | "income") => (
    <TouchableOpacity style={styles.input} onPress={() => openDropdown(type)}>
      <Text style={value ? styles.selectedText : styles.placeholder}>{value || label}</Text>
      <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainWrapper}>
      {/* 1. THE LINES - Positioned exactly like other screens */}
      <View style={styles.topBackground}>
        <Image 
          source={require("../../assets/Logo.png")} 
          style={styles.backgroundImage}
          resizeMode="cover" 
        />
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          {/* Header with right-aligned close */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
              <Ionicons name="close" size={20} color="#004D25" />
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Employment & Income</Text>
          <Text style={styles.subtitle}>This helps us assess repayment ability.</Text>

          {renderDropdown("Employment Information", employmentInfo, "employment")}
          {renderDropdown("Occupation", occupation, "occupation")}
          {renderDropdown("Education Details", education, "education")}
          {renderDropdown("Monthly Income", monthlyIncome, "income")}

          {/* 2. Signature Button - Right Aligned with Black Border */}
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={[styles.button, loading && { opacity: 0.6 }]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#004D25" />
              ) : (
                <Text style={styles.buttonText}>Continue</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* MODAL REMAINS THE SAME */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              {modalOptions.map((option) => (
                <TouchableOpacity key={option} style={styles.modalOption} onPress={() => selectOption(option)}>
                  <Text style={styles.modalOptionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.modalCancel} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Matches the bottom section of design
  },
  topBackground: {
    position: 'absolute',
    top: 0,
    width: width,
    height: height * 0.45,
    backgroundColor: "#D0F9D7", // Exact brand mint green
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8, // High visibility for curved lines
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'flex-end',
    marginTop: 10,
    marginBottom: 20,
  },
  closeBtn: {
    width: 36,
    height: 36,
    backgroundColor: "#A2F6AF", // Box color matching design
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#004D25", // Dark Forest Green
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#004D25",
    opacity: 0.8,
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  placeholder: {
    color: "#9CA3AF",
    fontSize: 15,
  },
  selectedText: {
    fontSize: 15,
    color: "#004D25",
    fontWeight: "600",
  },
  buttonWrapper: {
    alignItems: "flex-end", // Aligns button to bottom right
    marginTop: "auto",
    paddingTop: 30,
  },
  button: {
    backgroundColor: "#A2F6AF", // Lime Green
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#000000", // Black border per design
  },
  buttonText: {
    fontWeight: "800",
    color: "#004D25",
    fontSize: 18,
  },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" },
  modalContent: { backgroundColor: "#fff", paddingBottom: 20, borderTopLeftRadius: 16, borderTopRightRadius: 16, maxHeight: "50%" },
  modalOption: { paddingVertical: 16, paddingHorizontal: 24, borderBottomWidth: 1, borderBottomColor: "#E5E7EB" },
  modalOptionText: { fontSize: 14, color: "#004D25" },
  modalCancel: { padding: 16, alignItems: "center" },
  modalCancelText: { color: "#EF4444", fontWeight: "600", fontSize: 14 },
});