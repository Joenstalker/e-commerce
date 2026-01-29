import SafeScreen from "@/components/SafeScreen";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

export default function NotificationsScreen() {
  return (
    <SafeScreen>
      <View className="px-6 pb-5 border-b border-surface flex-row items-center bg-background">
        <TouchableOpacity
          onPress={() => router.back()}
          className="mr-4 bg-surface-lighter rounded-full p-1 border border-surface-lighter"
        >
          <Ionicons name="arrow-back" size={24} color="#57534E" />
        </TouchableOpacity>
        <Text className="text-text-primary text-2xl font-bold">Notifications</Text>
      </View>

      <View className="flex-1 items-center justify-center px-6">
        <Ionicons name="notifications-outline" size={80} color="#78716C" />
        <Text className="text-text-primary font-semibold text-xl mt-4 text-center">
          No new notifications
        </Text>
        <Text className="text-text-secondary text-center mt-2">
          Order updates and other activity from the admin will appear here.
        </Text>
      </View>
    </SafeScreen>
  );
}
