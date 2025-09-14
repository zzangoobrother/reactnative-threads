import { usePathname, useRouter } from "expo-router";
import { Text, View, TouchableOpacity } from "react-native";

export default function Index() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <TouchableOpacity onPress={() => router.replace("/")}>
          <Text style={{color: pathname === "/" ? "red" : "black"}}>For you</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity onPress={() => router.replace("/following")}>
          <Text style={{color: pathname === "/" ? "black" : "red"}}>Following</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
