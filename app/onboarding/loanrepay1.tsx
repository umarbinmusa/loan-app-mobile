import React from "react";
import {
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface Installment {
  id: string;
  label: string;
  date: string;
  amount: string;
  status: "Pending" | "Paid";
}

const scheduleData: Installment[] = [
  { id: "1", label: "Installment 1", date: "15 Apr 2026", amount: "₦8,750", status: "Pending" },
  { id: "2", label: "Installment 2", date: "15 May 2026", amount: "₦8,750", status: "Pending" },
  { id: "3", label: "Installment 3", date: "15 Jun 2026", amount: "₦8,750", status: "Pending" },
  { id: "4", label: "Installment 4", date: "15 Jul 2026", amount: "₦8,750", status: "Pending" },
];

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function RepaymentScheduleModal({ visible, onClose }: Props) {
  const renderItem = ({ item }: { item: Installment }) => (
    <View style={styles.scheduleRow}>
      <View>
        <Text style={styles.installmentLabel}>{item.label}</Text>
        <Text style={[styles.statusText, item.status === "Pending" ? styles.statusPending : styles.statusPaid]}>
          {item.status}
        </Text>
      </View>
      <View style={styles.rightContent}>
        <Text style={styles.dateText}>{item.date}</Text>
        <Text style={styles.amountText}>{item.amount}</Text>
      </View>
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <View style={styles.bottomSheet}>
          {/* Handle Bar */}
          <View style={styles.handle} />

          <View style={styles.header}>
            <Text style={styles.headerTitle}>Repayment Schedule</Text>
          </View>

          <FlatList
            data={scheduleData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Dim background
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: "55%", // Covers roughly half the screen
    paddingTop: 12,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#9CA3AF", // Light grey header
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  scheduleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  rightContent: {
    alignItems: "flex-end",
  },
  installmentLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },
  statusPending: {
    color: "#D97706", 
  },
  statusPaid: {
    color: "#16A34A",
  },
  dateText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 4,
  },
  amountText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#374151",
  },
  separator: {
    height: 1,
    backgroundColor: "#F3F4F6",
  },
});