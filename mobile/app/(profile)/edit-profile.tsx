import SafeScreen from "@/components/SafeScreen";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function EditProfileScreen() {
  const { user } = useUser();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName ?? "");
      setLastName(user.lastName ?? "");
    }
  }, [user]);

  const handleSave = async () => {
    if (!firstName.trim()) {
      Alert.alert("Validation", "First name is required.");
      return;
    }
    try {
      setSaving(true);
      await user?.update({ firstName: firstName.trim(), lastName: lastName.trim() });
      Alert.alert("Success", "Profile updated.", [{ text: "OK", onPress: () => router.back() }]);
    } catch (e: any) {
      Alert.alert("Error", e?.message ?? "Could not update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeScreen>
      <View className="px-6 pb-5 border-b border-surface flex-row items-center bg-background">
        <TouchableOpacity
          onPress={() => router.back()}
          className="mr-4 bg-surface-lighter rounded-full p-1 border border-surface-lighter"
        >
          <Ionicons name="arrow-back" size={24} color="#57534E" />
        </TouchableOpacity>
        <Text className="text-text-primary text-2xl font-bold">Edit Profile</Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-5">
          <Text className="text-text-primary font-semibold mb-2">First name</Text>
          <TextInput
            className="bg-surface border border-surface-lighter text-text-primary px-4 py-4 rounded-2xl text-base"
            placeholder="First name"
            placeholderTextColor="#78716C"
            value={firstName}
            onChangeText={setFirstName}
            editable={!saving}
          />
        </View>
        <View className="mb-6">
          <Text className="text-text-primary font-semibold mb-2">Last name</Text>
          <TextInput
            className="bg-surface border border-surface-lighter text-text-primary px-4 py-4 rounded-2xl text-base"
            placeholder="Last name"
            placeholderTextColor="#78716C"
            value={lastName}
            onChangeText={setLastName}
            editable={!saving}
          />
        </View>
        <TouchableOpacity
          className="bg-primary rounded-2xl py-5 items-center"
          onPress={handleSave}
          disabled={saving}
          activeOpacity={0.8}
        >
          {saving ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text className="text-white font-bold text-lg">Save changes</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeScreen>
  );
}
