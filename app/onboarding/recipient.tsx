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
  bgMint: "#DFFFE3",
  pureWhite: "#FFFFFF",
  primaryGreen: "#004D25",
  accentGreen: "#16A34A",
  buttonGreen: "#9FF5B4",
  borderGrey: "#E5E7EB",
  textGrey: "#6B7280",
  statusYellow: "#D9A406",
};

export default function ExactLoanDesign() {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [frequency, setFrequency] = useState('Monthly');
  const [isScheduleVisible, setScheduleVisible] = useState(false);

  return (
    <View style={styles.mainWrapper}>
      <StatusBar barStyle="dark-content" />
      
      {/* 1. THE EXACT SPLIT BACKGROUND */}
      <View style={StyleSheet.absoluteFill}>
        {/* Top half Green section */}
        <View style={styles.topGreenSection}>
             <Image 
              source={require("../../assets/Logo.png")} 
              style={styles.arcPattern}
              resizeMode="cover" 
            />
        </View>
        {/* Bottom half White section */}
        <View style={styles.bottomWhiteSection} />
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* HEADER SECTION */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={20} color={COLORS.primaryGreen} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Quickteller Loan</Text>
            <TouchableOpacity>
              <Ionicons name="information-circle-outline" size={24} color={COLORS.primaryGreen} />
            </TouchableOpacity>
          </View>

          {/* LOAN CARD - Placed on the Green */}
          <View style={styles.mainCard}>
            <Text style={styles.cardLabel}>Loan Amount</Text>
            <Text style={styles.amountDisplay}>₦{loanAmount.toLocaleString()}</Text>
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
            <Text style={styles.rangeInfo}>₦50,000 to ₦10,000,000</Text>
          </View>

          {/* OPTIONS SECTION - Transitioning to the White */}
          <View style={styles.optionsContainer}>
            <Text style={styles.sectionHeading}>Repayment Frequency</Text>
            <View style={styles.frequencyRow}>
              {['Daily', 'Weekly', 'Monthly'].map((item) => (
                <TouchableOpacity 
                  key={item} 
                  style={[styles.freqBtn, frequency === item && styles.freqBtnActive]}
                  onPress={() => setFrequency(item)}
                >
                  <View style={[styles.customRadio, frequency === item && styles.radioOn]}>
                    {frequency === item && <View style={styles.radioDot} />}
                  </View>
                  <Text style={styles.freqLabel}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionHeading}>Tenor</Text>
            <View style={styles.tenorDropdown}>
              <Text style={styles.dropdownText}>6 Months</Text>
              <Ionicons name="chevron-down" size={18} color={COLORS.textGrey} />
            </View>
            <View style={styles.interestNote}>
              <Ionicons name="information-circle" size={16} color={COLORS.accentGreen} />
              <Text style={styles.interestLabel}>Interest: <Text style={{fontWeight: '700'}}>5% monthly</Text></Text>
            </View>

            {/* SUMMARY */}
            <View style={styles.summaryTopRow}>
              <Text style={styles.summaryTitle}>Summary</Text>
              <TouchableOpacity onPress={() => setScheduleVisible(true)}>
                <Text style={styles.scheduleLink}>View Repayment Schedule</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.summaryBox}>
              <SummaryItem label="Monthly Repayment" value="₦8,750" />
              <SummaryItem label="Total Repayment" value="₦52,500" />
              <SummaryItem label="No. of Repayment" value="6" isLast />
            </View>
          </View>

          <View style={{ height: 120 }} />
        </ScrollView>

        {/* FLOATING ACTION BUTTON */}
        <View style={styles.footerLayer}>
          <TouchableOpacity style={styles.continueBtn} activeOpacity={0.8}>
            <Text style={styles.continueBtnText}>Continue</Text>
            <Ionicons name="arrow-forward" size={22} color={COLORS.primaryGreen} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* REPAYMENT SCHEDULE MODAL */}
      <RepaymentModal visible={isScheduleVisible} onClose={() => setScheduleVisible(false)} />
    </View>
  );
}

function SummaryItem({ label, value, isLast }: any) {
  return (
    <View style={[styles.summaryItemRow, !isLast && styles.bottomBorder]}>
      <Text style={styles.sumLabel}>{label}</Text>
      <Text style={styles.sumValue}>{value}</Text>
    </View>
  );
}

function RepaymentModal({ visible, onClose }: any) {
  const scheduleData = [
    { id: '1', label: 'Installment 1', date: '15 Apr 2026', amount: '₦8,750' },
    { id: '2', label: 'Installment 2', date: '15 Apr 2026', amount: '₦8,750' },
    { id: '3', label: 'Installment 3', date: '15 Apr 2026', amount: '₦8,750' },
  ];

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.sheet}>
          <View style={styles.dragIndicator} />
          <Text style={styles.sheetTitle}>Repayment Schedule</Text>
          <FlatList
            data={scheduleData}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.scheduleItem}>
                <View>
                  <Text style={styles.instNum}>{item.label}</Text>
                  <Text style={styles.statusPending}>Pending</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.instDate}>{item.date}</Text>
                  <Text style={styles.instVal}>{item.amount}</Text>
                </View>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={styles.divider} />}
            contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flex: 1 },
  // SPLIT BACKGROUND STYLES
  topGreenSection: { height: height * 0.45, backgroundColor: COLORS.bgMint, overflow: 'hidden' },
  bottomWhiteSection: { height: height * 0.55, backgroundColor: COLORS.pureWhite },
  arcPattern: { position: 'absolute', width: width * 1.5, height: height * 0.5, right: -width * 0.2, top: -height * 0.05, opacity: 0.15 },

  scrollContent: { paddingHorizontal: 20 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 15 },
  headerTitle: { fontSize: 18, fontWeight: "800", color: COLORS.primaryGreen },
  backButton: { width: 44, height: 44, backgroundColor: COLORS.buttonGreen, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  
  // CARD ON GREEN
  mainCard: { backgroundColor: COLORS.pureWhite, borderRadius: 20, padding: 24, marginTop: 10, elevation: 4, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 10 },
  cardLabel: { color: COLORS.accentGreen, fontSize: 13, fontWeight: "600", marginBottom: 5 },
  amountDisplay: { fontSize: 32, fontWeight: "800", color: COLORS.primaryGreen, marginBottom: 12 },
  slider: { width: '100%', height: 40 },
  rangeInfo: { color: COLORS.primaryGreen, fontSize: 12, fontWeight: "700" },

  // OPTIONS ON WHITE
  optionsContainer: { marginTop: 10 },
  sectionHeading: { fontSize: 14, fontWeight: "600", color: COLORS.textGrey, marginTop: 24, marginBottom: 12 },
  frequencyRow: { flexDirection: 'row', justifyContent: 'space-between' },
  freqBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.pureWhite, padding: 12, borderRadius: 12, borderWidth: 1, borderColor: COLORS.borderGrey, width: '31%' },
  freqBtnActive: { borderColor: COLORS.accentGreen, backgroundColor: "#F0FDF4" },
  customRadio: { width: 20, height: 20, borderRadius: 10, borderWidth: 1.5, borderColor: "#D1D5DB", marginRight: 8, justifyContent: 'center', alignItems: 'center' },
  radioOn: { borderColor: COLORS.accentGreen },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.accentGreen },
  freqLabel: { fontSize: 13, fontWeight: "700", color: "#374151" },
  
  tenorDropdown: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: COLORS.pureWhite, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: COLORS.borderGrey },
  dropdownText: { fontSize: 14, color: COLORS.textGrey, fontWeight: "500" },
  interestNote: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  interestLabel: { color: COLORS.textGrey, fontSize: 13, marginLeft: 6 },

  summaryTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 28, marginBottom: 12 },
  summaryTitle: { fontSize: 14, fontWeight: "600", color: COLORS.textGrey },
  scheduleLink: { color: COLORS.accentGreen, fontSize: 13, fontWeight: "600" },
  summaryBox: { backgroundColor: COLORS.pureWhite, borderRadius: 18, paddingHorizontal: 16, borderWidth: 1, borderColor: COLORS.borderGrey },
  summaryItemRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16 },
  bottomBorder: { borderBottomWidth: 1, borderBottomColor: "#F3F4F6" },
  sumLabel: { color: "#4B5563", fontSize: 14, fontWeight: "600" },
  sumValue: { fontWeight: "800", fontSize: 14, color: "#111827" },

  // FOOTER
  footerLayer: { position: 'absolute', bottom: 30, right: 20 },
  continueBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.buttonGreen, paddingVertical: 16, paddingHorizontal: 32, borderRadius: 16, borderWidth: 1.5, borderColor: COLORS.primaryGreen, elevation: 6 },
  continueBtnText: { fontSize: 18, fontWeight: "800", color: COLORS.primaryGreen, marginRight: 10 },

  // MODAL STYLES
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" },
  sheet: { backgroundColor: COLORS.pureWhite, borderTopLeftRadius: 32, borderTopRightRadius: 32, maxHeight: "65%" },
  dragIndicator: { width: 40, height: 4, backgroundColor: COLORS.borderGrey, borderRadius: 2, alignSelf: "center", marginVertical: 16 },
  sheetTitle: { fontSize: 14, color: "#9CA3AF", fontWeight: "600", paddingHorizontal: 24, marginBottom: 16 },
  scheduleItem: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 16 },
  instNum: { fontSize: 14, fontWeight: "700", color: "#1F2937" },
  statusPending: { fontSize: 12, fontWeight: "700", color: COLORS.statusYellow, marginTop: 4 },
  instDate: { fontSize: 14, fontWeight: "800", color: "#111827" },
  instVal: { fontSize: 13, fontWeight: "700", color: "#4B5563", marginTop: 4 },
  divider: { height: 1, backgroundColor: "#F3F4F6" },
});