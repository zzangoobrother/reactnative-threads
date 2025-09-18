import { Redirect, router } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useContext } from "react";
import { AuthContext } from "./_layout";

export default function Login() {
    const insets = useSafeAreaInsets();
    const {user, login} = useContext(AuthContext);
    const isLoggedIn = !!user;

    if (isLoggedIn) {
        return <Redirect href="/(tabs)" />
    }

    return <View style={styles.loginButton}>
        <Pressable onPress={() => router.back()}>
            <Text>Back</Text>
        </Pressable>
        <Pressable onPress={login}>
            <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>
    </View>
}

const styles = StyleSheet.create({
    loginButton: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
        width: 100,
        alignItems: "center"
    },
    loginButtonText: {
        color: "white"
    }
})
;