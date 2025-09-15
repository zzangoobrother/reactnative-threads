import { BlurView } from "expo-blur";
import { usePathname, useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const isLoggedIn = false;

  return (
    <View style={[styles.container, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>
      
      <BlurView style={styles.header} intensity={70}>
        <Image source={require("../../../assets/images/react-logo.png")} style={styles.headerLogo} />
        {!isLoggedIn && (
          <TouchableOpacity style={styles.loginButton} onPress={() => router.navigate(`/login`)}>
            <Text style={styles.loginButtonText}>로그인</Text>
          </TouchableOpacity>
        )}
      </BlurView>

      {isLoggedIn && (
        <View style={styles.tabContainer}>
          <View style={styles.tabs}>
            <TouchableOpacity onPress={() => router.replace("/")}>
              <Text style={{color: pathname === "/" ? "red" : "black"}}>
                For you
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tabs}>
            <TouchableOpacity onPress={() => router.replace("/following")}>
              <Text style={{color: pathname === "/" ? "black" : "red"}}>
                Following
              </Text>
            </TouchableOpacity>
          </View>
      </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row"
  },
  tabs: {
    flex: 1,
    alignItems: "center"
  },
  header: {
    alignItems: "center"
  },
  headerLogo: {
    width: 42,
    height: 42
  },
  loginButton: {
    position: "absolute",
    right: 20,
    top: 0,
    backgroundColor: "black",
    color: "white",
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  loginButtonText: {
    color: "white",
  }
});
