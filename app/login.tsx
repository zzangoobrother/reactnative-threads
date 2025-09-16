import { Redirect, router } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function Login() {
    const insets = useSafeAreaInsets();
    const isLoggedIn = false;

    const onLogin = () => {
        fetch("/login", {
            method: "POST",
            body: JSON.stringify({
                username: "zerocho",
                password: "1234",
            }),
        })
        .then((res) => {
            if (res.status >= 400) {
                return Alert.alert("Error", "Invalid credentials");
            }

            return res.json();
        })
        .then((data) => {
            return Promise.all([
                SecureStore.setItemAsync("accessToken", data.accessToken),
                SecureStore.setItemAsync("refreshToken", data.refreshToken),
                AsyncStorage.setItem("user", JSON.stringify(data.user))
            ]);
        })
        .then(() => {
            router.push("/(tabs)");
        })
        .catch((error) => {
            console.error(error);
        });
    };

    if (isLoggedIn) {
        return <Redirect href="/(tabs)" />
    }

    return <View style={styles.loginButton}>
        <Pressable onPress={() => router.back()}>
            <Text>Back</Text>
        </Pressable>
        <Pressable onPress={onLogin}>
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