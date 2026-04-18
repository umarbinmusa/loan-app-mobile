import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

// Mock Data to match your image
const LOAN_OPTIONS = [
  { id: '1', title: 'Quickteller Loan', range: '₦5,000 to ₦100,000' },
  { id: '2', title: 'Quickteller Loan', range: '₦5,000 to ₦100,000' },
  { id: '3', title: 'Quickteller Loan', range: '₦5,000 to ₦100,000' },
  { id: '4', title: 'Quickteller Loan', range: '₦5,000 to ₦100,000' },
  { id: '5', title: 'Quickteller Loan', range: '₦5,000 to ₦100,000' },
];

const LoanSelectionScreen = () => {

  const renderLoanItem = ({ item }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        <Text style={styles.logoText}>Q</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.loanTitle}>{item.title}</Text>
        <Text style={styles.loanAmount}>{item.range}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Close Button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.closeButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="close" size={20} color="#065F46" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={LOAN_OPTIONS}
        renderItem={renderLoanItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECFDF5', // Light mint background from your design
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    alignItems: 'flex-end',
  },
  closeButton: {
    backgroundColor: '#D1FAE5',
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    // Soft shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  iconContainer: {
    width: 44,
    height: 44,
    backgroundColor: '#2D5AF0', // Quickteller Blue
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  textContainer: {
    marginLeft: 14,
  },
  loanTitle: {
    fontSize: 12,
    color: '#6B7280', // Grey subtitle color
    marginBottom: 2,
  },
  loanAmount: {
    fontSize: 15,
    fontWeight: '700',
    color: '#064E3B', // Dark green text
  },
});

export default LoanSelectionScreen;