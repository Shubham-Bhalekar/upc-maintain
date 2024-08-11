import { View, Text, SafeAreaView, Platform } from "react-native";
import React from "react";
import { useGlobalContext } from "@/context/GlobalContext";
import CustomButton from "@/components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { logOut } from "@/lib/utils";

const Settings = () => {
  const { user }: any = useGlobalContext();

  return (
    <SafeAreaView className="bg-background h-full justify-center items-center">
      <View
        className={`${
          Platform.OS === "web" ? "w-[90vh]" : "w-full"
        } h-full justify-center items-center`}
      >
        <Text className="text-xl font-psemibold">
          Welcome <Text className="font-pbold">{user}</Text>
        </Text>
        <CustomButton
          containerStyles="bg-red-300 w-[30vh]"
          handlePress={async () => {
            await logOut();
          }}
          isLoading={false}
          textStyles="text-white"
          title="Log out"
        />
      </View>
      <StatusBar backgroundColor="#F5F5F5" style="dark" />
    </SafeAreaView>
  );
};

export default Settings;
