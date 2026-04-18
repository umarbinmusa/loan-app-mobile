import { gql, useQuery } from "@apollo/client";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useMemo } from "react";
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

/* ============================
   GRAPHQL QUERY (USERS)
============================ */
const GET_USERS = gql`
  query GetUsers {
    users {
      id
      first_name
      last_name
      name
      phone
    }
  }
`;

export default function OnboardingOne() {
  const { data, loading, error } = useQuery(GET_USERS);

  // TEMP: pick first user (until JWT/me exists)
  const user = data?.users?.[0];

  const displayName = useMemo(() => {
    if (!user) return "User";
    if (user.first_name) return user.first_name;
    if (user.name) return user.name;
    return "User";
  }, [user]);

  /* ---------- STATES ---------- */
  if (loading) {
    return (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator size="large" color="#2E7D32" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.loader}>
        <Text style={{ color: "red" }}>
          Failed to load user
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.greetEmoji}>👋</Text>
          <Text style={styles.greetText}>
            Welcome back, {displayName}
          </Text>
          <TouchableOpacity style={styles.helpCircle}>
            <Ionicons
              name="help-circle-outline"
              size={22}
              color="#2E7D32"
            />
          </TouchableOpacity>
        </View>

        {/* Credit Card */}
        <View style={styles.creditCard}>
          <Text style={styles.creditLabel}>Available Credit</Text>
          <Text style={styles.creditAmount}>₦2,000,000</Text>
          <Text style={styles.creditSub}>
            Based on your credit profile
          </Text>
        </View>

        {/* Get Funds */}
        <TouchableOpacity style={styles.getFundsButton}>
          <Text style={styles.getFundsText}>Get Funds</Text>
        </TouchableOpacity>

        {/* Actions */}
        <View style={styles.actionGrid}>
          <ActionItem icon="list-status" label="Loan History" />
          <ActionItem icon="send" label="Send Money" />
          <ActionItem icon="plus-circle" label="Fund Wallet" />
        </View>

        {/* Loan Health */}
        <Text style={styles.sectionTitle}>Loan health</Text>
        <View style={styles.healthCard}>
          <View style={styles.gaugeContainer}>
            <View style={styles.gaugeBase}>
              <View style={styles.gaugeFill} />
            </View>

            <View style={styles.gaugeValueContainer}>
              <Text style={styles.scoreText}>720</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>Good</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoBox}>
            <Ionicons
              name="information-circle"
              size={18}
              color="#2E7D32"
            />
            <Text style={styles.infoBoxText}>
              Loan Health is based on repayments,
              balance, and payment consistency.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavWrapper}>
        <View style={styles.bottomNav}>
          <TabItem icon="home" label="Home" active />
          <TabItem icon="wallet-outline" label="Wallet" />
          <TabItem icon="person-outline" label="Account" />
        </View>
      </View>
    </SafeAreaView>
  );
}

/* ============================
   COMPONENTS
============================ */
const ActionItem = ({ icon, label }: any) => (
  <TouchableOpacity style={styles.actionCard}>
    <MaterialCommunityIcons name={icon} size={24} color="#2E7D32" />
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);

const TabItem = ({ icon, label, active }: any) => (
  <TouchableOpacity style={styles.tabItem}>
    <View style={[styles.tabIconCircle, active && styles.activeTabCircle]}>
      <Ionicons
        name={icon}
        size={20}
        color={active ? "#fff" : "#888"}
      />
    </View>
    <Text style={[styles.tabLabel, active && styles.activeTabText]}>
      {label}
    </Text>
  </TouchableOpacity>
);

/* ============================
   STYLES (UNCHANGED)
============================ */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E8FFE8" },
  content: { padding: 20, paddingBottom: 120 },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },

  headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  greetEmoji: { fontSize: 20, marginRight: 8 },
  greetText: { fontSize: 16, fontWeight: "600", color: "#2E7D32" },
  helpCircle: { marginLeft: "auto" },

  creditCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 25,
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#D7F5D7",
  },
  creditLabel: { fontSize: 13, color: "#2E7D32" },
  creditAmount: { fontSize: 32, fontWeight: "800", color: "#2E7D32" },
  creditSub: { fontSize: 11, color: "#2E7D32", opacity: 0.7 },

  getFundsButton: {
    backgroundColor: "#A5F3AC",
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#000",
  },
  getFundsText: { fontSize: 22, fontWeight: "700", color: "#000" },

  actionGrid: { flexDirection: "row", justifyContent: "space-between" },
  actionCard: {
    backgroundColor: "#fff",
    width: "31%",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D7F5D7",
  },
  actionLabel: {
    fontSize: 10,
    color: "#2E7D32",
    marginTop: 8,
    fontWeight: "600",
    textAlign: "center",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2E7D32",
    marginBottom: 12,
  },

  healthCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#D7F5D7",
  },

  gaugeContainer: { height: 120, alignItems: "center", justifyContent: "center" },
  gaugeBase: {
    width: 140,
    height: 70,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
    backgroundColor: "#E8FFE8",
    overflow: "hidden",
  },
  gaugeFill: {
    width: 140,
    height: 70,
    backgroundColor: "#2E7D32",
    transform: [{ rotate: "45deg" }],
  },

  gaugeValueContainer: { position: "absolute", bottom: 10, alignItems: "center" },
  scoreText: { fontSize: 24, fontWeight: "bold" },

  statusBadge: {
    backgroundColor: "#2E7D32",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginTop: 4,
  },
  statusBadgeText: { color: "#fff", fontSize: 10, fontWeight: "bold" },

  infoBox: {
    backgroundColor: "#F8FFF8",
    padding: 12,
    borderRadius: 10,
    flexDirection: "row",
    marginTop: 15,
    alignItems: "center",
  },
  infoBoxText: {
    flex: 1,
    fontSize: 11,
    color: "#2E7D32",
    marginLeft: 8,
    lineHeight: 15,
  },

  bottomNavWrapper: {
    position: "absolute",
    bottom: 25,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "85%",
    borderRadius: 50,
    paddingVertical: 10,
    justifyContent: "space-around",
    elevation: 8,
  },

  tabItem: { alignItems: "center" },
  tabIconCircle: { padding: 6, borderRadius: 20 },
  activeTabCircle: { backgroundColor: "#3CBF3B" },
  tabLabel: { fontSize: 10, color: "#888", marginTop: 2 },
  activeTabText: { color: "#2E7D32", fontWeight: "700" },
});
