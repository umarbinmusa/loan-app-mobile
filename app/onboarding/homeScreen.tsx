import {
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
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

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setUser({ first_name: "Micheal" });
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#22C55E" />
      </View>
    );
  }

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
          resizeMode="contain"
        />

        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* HEADER */}
            <View style={styles.header}>
              <Text style={styles.welcomeText}>
                👋 Welcome back, {user?.first_name}
              </Text>
              <View style={styles.helpCircle}>
                <Text style={styles.helpText}>?</Text>
              </View>
            </View>

            {/* CREDIT CARD */}
            <View style={styles.creditCard}>
              <Text style={styles.cardLabel}>Available Credit</Text>
              <Text style={styles.amount}>₦2,000,000</Text>
              <Text style={styles.cardSub}>
                Based on your credit profile
              </Text>

              <View style={styles.indicatorContainer}>
                <View style={[styles.indicator, styles.indicatorActive]} />
                <View style={styles.indicator} />
                <View style={styles.indicatorSmall} />
              </View>
            </View>

            {/* GET FUNDS */}
            <TouchableOpacity
              style={styles.fundsBanner}
              onPress={() => router.push("/onboarding/get-funds")}
            >
              <Text style={styles.fundsText}>Get Funds</Text>
            </TouchableOpacity>

            {/* ACTIONS */}
            <View style={styles.actionRow}>
              <ActionBox label="loan history" />
              <ActionBox label="Send Money" isMaterial icon="send" />
              <ActionBox
                label="Fund Wallet"
                isFeather
                icon="plus-circle"
                onPress={() => router.push("/onboarding/wallet")}
              />
            </View>

            {/* LOAN HEALTH */}
            <View style={styles.healthSection}>
              <Text style={styles.sectionTitle}>Loan health</Text>

              <View style={styles.healthCard}>
                <View style={styles.gaugeContainer}>
                  <View style={styles.arcContainer}>
                    <View
                      style={[
                        styles.arcSegment,
                        {
                          transform: [{ rotate: "40deg" }],
                          borderColor: "#166534",
                        },
                      ]}
                    />
                    <View
                      style={[
                        styles.arcSegment,
                        {
                          transform: [{ rotate: "140deg" }],
                          borderColor: "#BBF7D0",
                        },
                      ]}
                    />

                    <View style={styles.gaugeCenter}>
                      <Text style={styles.scoreText}>720</Text>
                      <View style={styles.statusBadge}>
                        <Text style={styles.statusText}>Good</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.infoBox}>
                  <Ionicons
                    name="information-circle"
                    size={16}
                    color="#065F46"
                  />
                  <Text style={styles.infoText}>
                    Loan Health is based on your repayments, balance, and
                    payment consistency. A higher score improves your loan
                    offers.
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* TAB BAR */}
          <View style={styles.tabBarContainer}>
            <View style={styles.tabBar}>
              <TabItem icon="home" label="Home" active />
              <TabItem
                icon="wallet-outline"
                label="Wallet"
                onPress={() => router.push("/onboarding/useraddmoney")}
              />
              <TabItem
                icon="person-outline"
                label="Account"
                onPress={() => router.push("/onboarding/account")}
              />
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

/* COMPONENTS */

const ActionBox = ({ icon, label, isMaterial, isFeather, onPress }: any) => (
  <TouchableOpacity style={styles.actionBox} onPress={onPress}>
    <View style={{ marginBottom: 6 }}>
      {isMaterial ? (
        <MaterialIcons name={icon} size={20} color="#065F46" />
      ) : isFeather ? (
        <Feather name={icon} size={20} color="#065F46" />
      ) : (
        <MaterialIcons
          name="format-list-bulleted"
          size={20}
          color="#065F46"
        />
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

/* STYLES */

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
  backgroundColor: "#22C55E",
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 1,
  borderColor: "#DCFCE7",
},
  helpText: { color: "#FFF", fontSize: 12, fontWeight: "700" },

  creditCard: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    paddingVertical: 22,
    alignItems: "center",
    marginBottom: 14,
    elevation: 2,
  },

  cardLabel: {
    fontSize: 12,
    color: "#22C55E",
  },

  amount: {
    fontSize: 30,
    fontWeight: "800",
    color: "#064E3B",
  },

  cardSub: {
    fontSize: 11,
    color: "#065F46",
    opacity: 0.6,
  },

  indicatorContainer: {
    flexDirection: "row",
    marginTop: 12,
    gap: 6,
  },

  indicator: {
    width: 8,
    height: 4,
    borderRadius: 4,
    backgroundColor: "#D1D5DB",
  },

  indicatorActive: {
    width: 20,
    backgroundColor: "#22C55E",
  },

  indicatorSmall: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#D1D5DB",
  },

  fundsBanner: {
    backgroundColor: "#BBF7D0",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 12,
    borderWidth: 0.5,
    borderColor: "#065F46",
  },

  fundsText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#064E3B",
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
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

  healthSection: { marginTop: 12 },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#065F46",
    marginBottom: 10,
  },

  healthCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 14,
  },

  gaugeContainer: {
    height: 130,
    justifyContent: "center",
    alignItems: "center",
  },

  arcContainer: {
    width: 160,
    height: 80,
    overflow: "hidden",
    alignItems: "center",
  },

  arcSegment: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 14,
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
  },

  gaugeCenter: {
    position: "absolute",
    bottom: 0,
    alignItems: "center",
  },

  scoreText: {
    fontSize: 22,
    fontWeight: "800",
    color: "#064E3B",
  },

  statusBadge: {
    backgroundColor: "#22C55E",
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 4,
  },

  statusText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "700",
  },

  infoBox: {
    flexDirection: "row",
    backgroundColor: "#F0FDF4",
    padding: 10,
    borderRadius: 8,
    marginTop: 12,
  },

  infoText: {
    fontSize: 10,
    color: "#065F46",
    marginLeft: 6,
    flex: 1,
  },

  tabBarContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },

  tabBar: {
    width: width * 0.9,
    height: 64,
    backgroundColor: "#FFF",
    borderRadius: 32,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    elevation: 6,
  },

  tabItem: { alignItems: "center" },

  tabIconCircle: {
    width: 46,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },

  activeTabBg: {
    backgroundColor: "#F0FDF4",
  },

  tabLabel: {
    fontSize: 10,
    color: "#9CA3AF",
  },

  activeTabText: {
    color: "#22C55E",
    fontWeight: "700",
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});