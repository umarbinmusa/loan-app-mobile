import { router } from "expo-router";
import React, { useEffect } from "react";
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";

const PRIMARY = "#2DBE44";

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/onboarding/one");
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />

      {/* Decorative Curves */}
      <Svg height={260} width="100%" style={styles.curves}>
        <Path
          d="M0 150 Q200 40 400 150 T900 150"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="2"
          fill="none"
        />
        <Path
          d="M0 180 Q200 70 400 180 T900 180"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="2"
          fill="none"
        />
        <Path
          d="M0 210 Q200 100 400 210 T900 210"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="2"
          fill="none"
        />
      </Svg>

      <SafeAreaView style={styles.safe}>
        {/* Center Logo */}
        <View style={styles.logoWrapper}>
          <Image
            source={require("../assets/Lemon.png")}
            style={styles.logo}
            resizeMode="contain"
            tintColor="#fff"
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.by}>By</Text>

          <View style={styles.footerRow}>
            <View style={styles.footerIcon}>
              <Image
                source={require("../assets/Lemon.png")}
                style={styles.footerIconImg}
              />
            </View>

            <View>
              <Text style={styles.company}>Hayok</Text>
              <Text style={styles.sub}>Medicare</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY,
  },

  safe: {
    flex: 1,
  },

  curves: {
    position: "absolute",
    top: -20,
  },

  logoWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: 120,
    height: 120,
  },

  footer: {
    alignItems: "center",
    marginBottom: 45,
  },

  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  footerIcon: {
    width: 42,
    height: 42,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  footerIconImg: {
    width: 26,
    height: 26,
  },

  by: {
    color: "#fff",
    fontSize: 12,
    opacity: 0.85,
  },

  company: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 20,
  },

  sub: {
    color: "#fff",
    fontSize: 13,
    letterSpacing: 0.6,
  },
});
