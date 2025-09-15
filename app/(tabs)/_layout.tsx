import { Ionicons } from "@expo/vector-icons";
import { type BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { Tabs, useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Modal, View, Text, TouchableOpacity, Animated, Pressable } from "react-native";

const AnimatedTabBarButton = ({
  children,
  onPress,
  style,
  ...restProps
}: BottomTabBarButtonProps) => {
    const scaleValue = useRef(new Animated.Value(1)).current;

    const handlePressOut = () => {
        Animated.sequence([
            Animated.spring(scaleValue, {
                toValue: 1.2,
                useNativeDriver: true,
                speed: 200,
            }),

            Animated.spring(scaleValue, {
                toValue: 1,
                useNativeDriver: true,
                speed: 100,
            })
        ]).start();
    };

    return (
        <Pressable
            {...restProps}
            onPress={onPress}
            onPressOut={handlePressOut}
            style={[
                {flex: 1, justifyContent: "center", alignItems: "center"},
                style,
            ]}
            android_ripple={{ borderless: false, radius: 0 }}
        >
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                {children}
            </Animated.View>
        </Pressable>
    );
};

export default function TabLayout() {
    const router = useRouter();
    const isLoggedIn = true;
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const openLoginModal = () => {
        setIsLoginModalOpen(true);
    }

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
    }

    return (
    <>
    <Tabs
        backBehavior="history"
        screenOptions={{
            headerShown: false,
            tabBarButton: (props) => <AnimatedTabBarButton {...props} />,
        }}
    >
        <Tabs.Screen 
        name="(home)" 
        options={{
            tabBarLabel: () => null,
            tabBarIcon: ({focused}) => (
                <Ionicons
                    name="home"
                    size={24}
                    color={focused ? "black" : "gray"}
                />
            ),
        }}
        />

        <Tabs.Screen 
            name="search"
            options={{
            tabBarLabel: () => null,
            tabBarIcon: ({focused}) => (
                <Ionicons
                    name="search"
                    size={24}
                    color={focused ? "black" : "gray"}
                />
            ),
            }}
        />
        <Tabs.Screen 
            name="add"
            listeners={{
                tabPress: (e) => {
                    e.preventDefault();
                    if (isLoggedIn) {
                        router.navigate("/modal");
                    } else {
                        openLoginModal();
                    }
                }
            }}
            options={{
            tabBarLabel: () => null,
            tabBarIcon: ({focused}) => (
                <Ionicons
                    name="add"
                    size={24}
                    color={focused ? "black" : "gray"}
                />
            ),
            }}
        />
        <Tabs.Screen 
            name="activity"
            listeners={{
                tabPress: (e) => {
                    if (!isLoggedIn) {
                        e.preventDefault();
                        openLoginModal();
                    }
                }
            }}
            options={{
            tabBarLabel: () => null,
            tabBarIcon: ({focused}) => (
                <Ionicons
                    name="heart-outline"
                    size={24}
                    color={focused ? "black" : "gray"}
                />
            ),
            }}
        />
        <Tabs.Screen 
            name="[username]" 
            listeners={{
                tabPress: (e) => {
                    if (!isLoggedIn) {
                        e.preventDefault();
                        openLoginModal();
                    }
                }
            }}
            options={{
            tabBarLabel: () => null,
            tabBarIcon: ({focused}) => (
                <Ionicons
                    name="person-outline"
                    size={24}
                    color={focused ? "black" : "gray"}
                />
            ),
            }}
        />
        <Tabs.Screen
            name="(post)/[username]/post/[postID]"
            options={{
                href: null,
            }}
        />
    </Tabs>

    <Modal
        visible={isLoginModalOpen}
        transparent={true}
        animationType="slide"
    >
        <View style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0, 0, 0, 0.5)"
        }}>
            <View style={{backgroundColor: "white", padding: 20}}>
                <Text>Login Modal</Text>
                    <TouchableOpacity onPress={closeLoginModal}>
                        <Ionicons name="close" size={24} color="#555" />
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
    </>
    );
}
