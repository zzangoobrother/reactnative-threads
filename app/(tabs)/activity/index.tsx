import { Redirect, usePathname, useRouter } from "expo-router";
import { Text, View, TouchableOpacity } from "react-native";
import NotFound from "@/app/+not-found";

export default function Index() {
  const router = useRouter();
  const pathname = usePathname();

  if (["/activity", "/activity/follows", "/activity/mentions", "/activity/quotes", "/activity/reposts", "/activity/verified"].includes(pathname)) {
    return <NotFound />
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <TouchableOpacity onPress={() => router.push("/activity")}>
          <Text>All</Text>
        </TouchableOpacity>
      </View>
      
      <View>
        <TouchableOpacity onPress={() => router.push("/activity/follows")}>
          <Text>Follows</Text>
        </TouchableOpacity>
      </View>
      
      <View>
        <TouchableOpacity onPress={() => router.push("/activity/mentions")}>
          <Text>Mentions</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity onPress={() => router.push("/activity/quotes")}>
          <Text>Quotes</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity onPress={() => router.push("/activity/reposts")}>
          <Text>Reposts</Text>
        </TouchableOpacity>

        <View>
        <TouchableOpacity onPress={() => router.push("/activity/verified")}>
          <Text>Verified</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
}
