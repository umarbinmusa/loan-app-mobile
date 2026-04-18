import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { router } from "expo-router";
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const { width, height } = Dimensions.get('window');

const COLORS = {
  headerMint: "#DFFFE3",
  pureWhite: "#FFFFFF",
  primaryGreen: "#004D25",
  accentGreen: "#16A34A",
  buttonGreen: "#9FF5B4",
  borderGrey: "#E5E7EB",
  textGrey: "#6B7280",
  statusYellow: "#D9A406",
};

const scheduleData = [
  { id: "1", label: "Installment 1", date: "15 Apr 2026", amount: "₦8,750", status: "Pending" },
  { id: "2", label: "Installment 2", date: "15 Apr 2026", amount: "₦8,750", status: "Pending" },
  { id: "3", label: "Installment 3", date: "15 Apr 2026", amount: "₦8,750", status: "Pending" },
  { id: "4", label: "Installment 4", date: "15 Apr 2026", amount: "₦8,750", status: "Pending" },
];

export default function QuicktellerLoan() {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [frequency, setFrequency] = useState('Monthly');
  const [scheduleVisible, setScheduleVisible] = useState(false);

  return (
    <View style={styles.mainWrapper}>
      <StatusBar barStyle="dark-content" />
      
      {/* 1. EXACT BACKGROUND DESIGN */}
      <View style={styles.topBgContainer}>
        <View style={styles.mintFill} />
        {/* This image handles the curved lines seen in your design */}
        <Image 
          source={require("../../assets/Logo.png")} 
          style={styles.linePattern}
          resizeMode="cover" 
        />
      </View>
      <View style={styles.bottomBg} />

      <SafeAreaView style={{ flex: 1 }}>
        {/* 2. HEADER */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={20} color={COLORS.primaryGreen} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Quickteller Loan</Text>
          <TouchableOpacity style={styles.infoIcon}>
            <Ionicons name="information-circle-outline" size={24} color={COLORS.primaryGreen} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* 3. LOAN AMOUNT CARD */}
          <View style={styles.amountCard}>
            <Text style={styles.labelSmall}>Loan Amount</Text>
            <Text style={styles.amountText}>₦{loanAmount.toLocaleString()}</Text>
            <Slider
              style={styles.slider}
              minimumValue={50000}
              maximumValue={10000000}
              step={50000}
              value={loanAmount}
              onValueChange={setLoanAmount}
              minimumTrackTintColor={COLORS.accentGreen}
              maximumTrackTintColor="#D1FAE5"
              thumbTintColor={COLORS.accentGreen}
            />
            <View style={styles.rangeRow}>
              <Text style={styles.rangeText}>₦50,000 to ₦10,000,000</Text>
            </View>
          </View>

          {/* 4. REPAYMENT FREQUENCY */}
          <Text style={styles.sectionLabel}>Repayment Frequency</Text>
          <View style={styles.frequencyRow}>
            {['Daily', 'Weekly', 'Monthly'].map((item) => (
              <TouchableOpacity 
                key={item} 
                style={[styles.freqBox, frequency === item && styles.freqBoxActive]}
                onPress={() => setFrequency(item)}
              >
                <View style={[styles.radio, frequency === item && styles.radioActive]}>
                  {frequency === item && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.freqText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* 5. TENOR */}
          <Text style={styles.sectionLabel}>Tenor</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>6 Months</Text>
            <Ionicons name="chevron-down" size={18} color={COLORS.textGrey} />
          </TouchableOpacity>
          
          <View style={styles.interestRow}>
            <Ionicons name="information-circle" size={16} color={COLORS.accentGreen} />
            <Text style={styles.interestText}>Interest: <Text style={{fontWeight: '700'}}>5% monthly</Text></Text>
          </View>

          {/* 6. SUMMARY */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryHeader}>
              <Text style={styles.summaryTitle}>Summary</Text>
              <TouchableOpacity onPress={() => setScheduleVisible(true)}>
                <Text style={styles.viewSchedule}>View Repayment Schedule</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.summaryCard}>
              <SummaryRow label="Monthly Repayment" value="₦8,750" />
              <SummaryRow label="Total Repayment" value="₦52,500" />
              <SummaryRow label="No. of Repayment" value="6" isLast />
            </View>
          </View>

          {/* Extra padding for scroll */}
          <View style={{ height: 120 }} />
        </ScrollView>

        {/* 7. FLOATING CONTINUE BUTTON */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueText}>Continue</Text>
            <Ionicons name="arrow-forward" size={22} color={COLORS.primaryGreen} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* 8. REPAYMENT SCHEDULE MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={scheduleVisible}
        onRequestClose={() => setScheduleVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setScheduleVisible(false)}>
          <View style={styles.bottomSheet}>
            <View style={styles.handle} />
            <Text style={styles.sheetHeader}>Repayment Schedule</Text>
            <FlatList
              data={scheduleData}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({ item }) => (
                <View style={styles.scheduleRow}>
                  <View>
                    <Text style={styles.installmentLabel}>{item.label}</Text>
                    <Text style={styles.statusText}>{item.status}</Text>
                  </View>
                  <View style={styles.rightContent}>
                    <Text style={styles.dateText}>{item.date}</Text>
                    <Text style={styles.amountLabel}>{item.amount}</Text>
                  </View>
                </View>
              )}
              contentContainerStyle={styles.listPadding}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

function SummaryRow({ label, value, isLast }: { label: string, value: string, isLast?: boolean }) {
  return (
    <View style={[styles.row, !isLast && styles.rowBorder]}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: COLORS.pureWhite },
  
  // Background Styles
  topBgContainer: { position: 'absolute', top: 0, left: 0, right: 0, height: height * 0.42, overflow: 'hidden' },
  mintFill: { ...StyleSheet.absoluteFillObject, backgroundColor: COLORS.headerMint },
  linePattern: { width: width * 1.5, height: '100%', position: 'absolute', right: -width * 0.2, top: 0, opacity: 0.3 },
  bottomBg: { position: 'absolute', bottom: 0, left: 0, right: 0, height: height * 0.58, backgroundColor: COLORS.pureWhite },

  // Header Styles
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10 },
  headerTitle: { fontSize: 18, fontWeight: "800", color: COLORS.primaryGreen },
  backButton: { width: 44, height: 44, backgroundColor: COLORS.buttonGreen, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  infoIcon: { padding: 5 },

  // Content Styles
  scrollContent: { paddingHorizontal: 20, paddingTop: 5 },
  amountCard: { backgroundColor: COLORS.pureWhite, borderRadius: 20, padding: 20, marginTop: 15, borderWidth: 1, borderColor: "#E8F5E9", elevation: 3, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 10 },
  amountText: { fontSize: 32, fontWeight: "800", color: COLORS.primaryGreen, marginBottom: 10 },
  slider: { width: '100%', height: 40, marginLeft: -10 },
  rangeText: { color: COLORS.primaryGreen, fontSize: 13, fontWeight: "700" },
  labelSmall: { color: COLORS.accentGreen, fontSize: 13, fontWeight: "600", marginBottom: 4 },
  sectionLabel: { fontSize: 14, fontWeight: "600", color: COLORS.textGrey, marginTop: 25, marginBottom: 12 },
  
  // Frequency Radio Buttons
  frequencyRow: { flexDirection: 'row', justifyContent: 'space-between' },
  freqBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.pureWhite, paddingVertical: 12, paddingHorizontal: 10, borderRadius: 12, borderWidth: 1, borderColor: COLORS.borderGrey, width: '31%' },
  freqBoxActive: { borderColor: COLORS.accentGreen, backgroundColor: "#F0FDF4" },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 1.5, borderColor: "#D1D5DB", marginRight: 8, justifyContent: 'center', alignItems: 'center' },
  radioActive: { borderColor: COLORS.accentGreen },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.accentGreen },
  freqText: { fontSize: 13, fontWeight: "700", color: "#374151" },

  // Tenor and Summary
  dropdown: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: COLORS.pureWhite, padding: 15, borderRadius: 15, borderWidth: 1, borderColor: COLORS.borderGrey },
  dropdownText: { fontSize: 14, color: COLORS.textGrey, fontWeight: "500" },
  interestRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  interestText: { color: COLORS.textGrey, fontSize: 13, marginLeft: 6 },
  summaryContainer: { marginTop: 25 },
  summaryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  summaryTitle: { fontSize: 14, fontWeight: "600", color: COLORS.textGrey },
  viewSchedule: { color: COLORS.accentGreen, fontSize: 13, fontWeight: "600" },
  summaryCard: { backgroundColor: COLORS.pureWhite, borderRadius: 15, paddingHorizontal: 16, borderWidth: 1, borderColor: COLORS.borderGrey },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: "#F3F4F6" },
  rowLabel: { color: "#374151", fontSize: 14, fontWeight: "600" },
  rowValue: { fontWeight: "800", fontSize: 14, color: "#000000" },

  // Footer Button
  footer: { position: 'absolute', bottom: 30, right: 20 },
  continueButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.buttonGreen, paddingVertical: 15, paddingHorizontal: 30, borderRadius: 15, borderWidth: 1.5, borderColor: COLORS.primaryGreen },
  continueText: { fontSize: 18, fontWeight: "800", color: COLORS.primaryGreen, marginRight: 10 },

  // Modal / Bottom Sheet
  modalOverlay: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.4)", justifyContent: "flex-end" },
  bottomSheet: { backgroundColor: COLORS.pureWhite, borderTopLeftRadius: 30, borderTopRightRadius: 30, maxHeight: "65%", paddingTop: 15 },
  handle: { width: 40, height: 4, backgroundColor: COLORS.borderGrey, borderRadius: 2, alignSelf: "center", marginBottom: 20 },
  sheetHeader: { fontSize: 14, color: "#9CA3AF", fontWeight: "600", paddingHorizontal: 25, marginBottom: 10 },
  listPadding: { paddingHorizontal: 25, paddingBottom: 40 },
  scheduleRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 15 },
  installmentLabel: { fontSize: 14, fontWeight: "700", color: "#374151" },
  statusText: { fontSize: 12, fontWeight: "700", color: COLORS.statusYellow, marginTop: 4 },
  rightContent: { alignItems: "flex-end" },
  dateText: { fontSize: 14, fontWeight: "800", color: "#111827" },
  amountLabel: { fontSize: 13, fontWeight: "700", color: "#374151", marginTop: 4 },
  separator: { height: 1, backgroundColor: "#F3F4F6" },
});