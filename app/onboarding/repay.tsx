import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/bg.jpeg")} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Background Logo Watermark */}
        <Image
          source={require("../../assets/Logo.png")}
          style={styles.logoOverlay}
          resizeMode="contain"
        />

        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView 
            contentContainerStyle={styles.scrollContent} 
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.welcomeText}>👋 Welcome back, Micheal</Text>
              <TouchableOpacity>
                 <Ionicons name="help-circle" size={22} color="#16A34A" />
              </TouchableOpacity>
            </View>

            {/* Total Borrowed Card */}
            <View style={styles.creditCard}>
              <Text style={styles.cardLabel}>Total Borrowed</Text>
              <Text style={styles.amount}>₦2,000,000</Text>
              <Text style={styles.cardSub}>
                Next Repayment • <Text style={{fontWeight: '800'}}>₦20,000</Text> — 25 May
              </Text>
              
              <View style={styles.indicatorContainer}>
                  <View style={[styles.indicator, styles.indicatorActive]} />
                  <View style={styles.indicatorSmall} />
              </View>
            </View>

            {/* Repay Loan Button */}
            <TouchableOpacity 
              style={styles.fundsBanner}
              onPress={() => console.log("Repay Loan")}
            >
              <Text style={styles.fundsText}>Repay Loan</Text>
            </TouchableOpacity>

            {/* Apply for loan link */}
            <TouchableOpacity style={styles.applyLink}>
              <Text style={styles.applyText}>Apply for loan</Text>
            </TouchableOpacity>

            {/* Action Row */}
            <View style={styles.actionRow}>
              <ActionBox 
                icon="format-list-bulleted" 
                label="loan history" 
                isMaterial
              />
              <ActionBox 
                icon="send" 
                label="Transfer" 
                isMaterial 
              />
              <ActionBox 
                icon="plus-circle" 
                label="Add Money" 
                isFeather
              />
            </View>
          </ScrollView>

          
          <View style={styles.tabBarContainer}>
              <View style={styles.tabBar}>
                <TabItem icon="home" label="Home" active />
                <TabItem icon="wallet-outline" label="Wallet" />
                <TabItem icon="person-outline" label="Account" />
              </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}



const ActionBox = ({ icon, label, isMaterial, isFeather }: any) => (
  <TouchableOpacity style={styles.actionBox}>
    <View style={styles.actionIconBg}>
        {isMaterial ? (
          <MaterialIcons name={icon} size={24} color="#004D25" />
        ) : isFeather ? (
          <Feather name={icon} size={22} color="#004D25" />
        ) : (
          <Ionicons name={icon} size={22} color="#004D25" />
        )}
    </View>
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);

const TabItem = ({ icon, label, active }: any) => (
  <View style={styles.tabItem}>
    <View style={[styles.tabIconCircle, active && styles.activeTabBg]}>
      <Ionicons
        name={icon}
        size={24}
        color={active ? "#16A34A" : "#9CA3AF"}
      />
    </View>
    <Text style={[styles.tabLabel, active && styles.activeTabText]}>{label}</Text>
  </View>
);

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: "#DFFFE4",
  },
  logoOverlay: {
    position: 'absolute',
    top: -20,
    right: -40,
    width: width * 0.8,
    height: width * 0.8,
    opacity: 0.05,
  
  },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 140 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeText: { fontSize: 15, fontWeight: "600", color: "#004D25" },
  creditCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 12,
  },
  cardLabel: { fontSize: 13, color: "#16A34A", fontWeight: '500', marginBottom: 6 },
  amount: { fontSize: 32, fontWeight: "800", color: "#004D25" },
  cardSub: { fontSize: 12, color: "#004D25", opacity: 0.7, marginTop: 6 },
  indicatorContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 18, gap: 6 },
  indicatorSmall: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#E5E7EB' },
  indicatorActive: { width: 28, height: 6, borderRadius: 3, backgroundColor: '#16A34A' },
  fundsBanner: {
    backgroundColor: "#A7F3A0",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#000",
  },
  fundsText: { fontSize: 20, fontWeight: "700", color: "#004D25" },
  applyLink: { alignSelf: 'center', marginVertical: 16 },
  applyText: { fontSize: 16, fontWeight: "700", color: "#004D25" },
  actionRow: { flexDirection: "row", justifyContent: "space-between" },
  actionBox: {
    backgroundColor: "#FFFFFF",
    width: "31%",
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#B9F4BC",
  },
  actionIconBg: { marginBottom: 10 },
  actionLabel: { fontSize: 11, color: "#004D25", fontWeight: "600", textAlign: "center" },
  tabBarContainer: { position: 'absolute', bottom: 30, left: 0, right: 0, alignItems: 'center' },
  tabBar: {
    width: width * 0.9,
    height: 75,
    backgroundColor: "#FFFFFF",
    borderRadius: 40,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 1, 
    borderColor: '#F3F4F6',
  },
  tabItem: { alignItems: "center" },
  tabIconCircle: { width: 50, height: 40, borderRadius: 20, justifyContent: "center", alignItems: "center" },
  activeTabBg: { backgroundColor: "#DFFFE4" },
  tabLabel: { fontSize: 11, color: "#9CA3AF", marginTop: 4, fontWeight: '500' },
  activeTabText: { color: "#16A34A", fontWeight: "700" },
});