import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, View } from "react-native";

export default function Index() {
  return (
    <SafeAreaView
      className="bg-background p-2 h-full"
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="mt-2 text-3xl text-accent font-pextrabold">
        UPC Maintain
      </Text>

      <View className="w-full p-5">
        <CustomButton
          title="Log In"
          containerStyles="bg-secondary-100"
          handlePress={() => {
            router.push("/log-in");
          }}
          isLoading={false}
          textStyles="text-black"
        />
        <CustomButton
          title="Sign Up "
          containerStyles="bg-secondary-200"
          handlePress={() => {}}
          isLoading={false}
          textStyles="text-black"
        />
      </View>
      <StatusBar backgroundColor="#F5F5F5" style="dark" />
    </SafeAreaView>
  );
}
