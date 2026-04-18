import {
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
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

const { width, height } = Dimensions.get("window");

export default function Wallet() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/bg.jpeg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        
        <Image
          source={require("../../assets/Logo.png")}
          style={styles.logoOverlay}
        />

        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            
            <View style={styles.header}>
              <Text style={styles.welcomeText}>
                👋 Welcome back, Micheal
              </Text>

              <View style={styles.helpCircle}>
                <Text style={styles.helpText}>?</Text>
              </View>
            </View>

            
            <View style={styles.balanceCard}>
              <Text style={styles.balanceLabel}>
                Available Balance
              </Text>

              <Text style={styles.balanceAmount}>
                ₦125,000
              </Text>

              <Text style={styles.balanceSub}>
                This is your withdrawal balance
              </Text>
            </View>

            
            <TouchableOpacity style={styles.addMoneyBtn} onPress={() => router.push("/onboarding/addmoney")}
            >
              <Text style={styles.addMoneyText}>Add Money</Text>
            </TouchableOpacity>

            
            <TouchableOpacity style={styles.withdrawBtn} onPress={() => router.push("/onboarding/widthraw")}
>
              <Text style={styles.withdrawText}>Withdraw</Text>
            </TouchableOpacity>

            
            <View style={styles.actionRow}>
              <ActionBox label="Loan History" />
              <ActionBox label="Send Money" icon="send" isMaterial />
              <ActionBox label="Pay Bills" icon="zap" isFeather />
            </View>

            
            <View style={styles.transactionHeader}>
              <Text style={styles.sectionTitle}>
                Transaction History
              </Text>

              <Text style={styles.seeMore}>
                See more →
              </Text>
            </View>

            
            <View style={styles.transactionCard}>
              <View style={styles.transactionLeft}>
                <View style={styles.dot} />
                <View>
                  <Text style={styles.transactionTitle}>
                    Withdrawal Successful
                  </Text>
                  <Text style={styles.transactionSub}>
                    Your withdrawal of ₦5,000 has been processed
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>

          
          <View style={styles.tabBarContainer}>
            <View style={styles.tabBar}>
              <TabItem icon="home" label="Home" onPress={() => router.push("/")} />
              <TabItem icon="wallet" label="Wallet" active />
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
    <View style={{ marginBottom: 6 }}>
      {isMaterial ? (
        <MaterialIcons name={icon} size={20} color="#065F46" />
      ) : isFeather ? (
        <Feather name={icon} size={20} color="#065F46" />
      ) : (
        <MaterialIcons name="format-list-bulleted" size={20} color="#065F46" />
      )}
    </View>
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);

const TabItem = ({ icon, label, active, onPress }: any) => (
  <TouchableOpacity style={styles.tabItem} onPress={onPress}>
    <View style={[styles.tabIconCircle, active && styles.activeTabBg]}>
      <Ionicons
        name={icon}
        size={20}
        color={active ? "#22C55E" : "#9CA3AF"}
      />
    </View>
    <Text style={[styles.tabLabel, active && styles.activeTabText]}>
      {label}
    </Text>
  </TouchableOpacity>
);



const styles = StyleSheet.create({
  container: { flex: 1 },

  backgroundImage: {
    flex: 1,
    width,
    height,
    backgroundColor: "#ECFDF3",
  },

  logoOverlay: {
    position: "absolute",
    top: -40,
    right: -60,
    width: width * 0.9,
    height: width * 0.9,
    opacity: 0.05,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 15,
  },

  welcomeText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#065F46",
  },

  helpCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#4ADE80",
    justifyContent: "center",
    alignItems: "center",
  },

  helpText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "700",
  },

  balanceCard: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    paddingVertical: 22,
    alignItems: "center",
    marginBottom: 14,
  },

  balanceLabel: {
    fontSize: 12,
    color: "#22C55E",
  },

  balanceAmount: {
    fontSize: 28,
    fontWeight: "800",
    color: "#064E3B",
  },

  balanceSub: {
    fontSize: 11,
    color: "#065F46",
    opacity: 0.6,
  },

  addMoneyBtn: {
    backgroundColor: "#BBF7D0",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#065F46",
  },

  addMoneyText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#064E3B",
  },

  withdrawBtn: {
    alignItems: "center",
    marginVertical: 10,
  },

  withdrawText: {
    fontSize: 14,
    color: "#065F46",
    fontWeight: "500",
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },

  actionBox: {
    backgroundColor: "#FFF",
    width: "31%",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 0.6,
    borderColor: "#D1FAE5",
  },

  actionLabel: {
    fontSize: 10,
    color: "#065F46",
    fontWeight: "600",
  },

  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#065F46",
  },

  seeMore: {
    fontSize: 12,
    color: "#6B7280",
  },

  transactionCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 14,
    marginTop: 10,
  },

  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#22C55E",
    marginRight: 10,
  },

  transactionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#064E3B",
  },

  transactionSub: {
    fontSize: 11,
    color: "#6B7280",
  },

  
  tabBarContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },

  tabBar: {
    width: width * 0.85,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 999,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ECFDF5",
  },

  tabItem: {
    alignItems: "center",
  },

  tabIconCircle: {
    width: 42,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  activeTabBg: {
    backgroundColor: "#DCFCE7",
    borderRadius: 20,
    paddingHorizontal: 6,
  },

  tabLabel: {
    fontSize: 10,
    color: "#9CA3AF",
  },

  activeTabText: {
    color: "#22C55E",
    fontWeight: "700",
  },
});