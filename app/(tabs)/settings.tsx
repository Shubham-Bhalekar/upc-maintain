import { View, Text, SafeAreaView, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/GlobalContext";
import CustomButton from "@/components/CustomButton";
import { save } from "@/lib/secure-store";
import { router } from "expo-router";
import { isLoaded, isLoading } from "expo-font";
import { StatusBar } from "expo-status-bar";

const Settings = () => {
  const { user }: any = useGlobalContext();

  const logOut=async ()=>{
    try {
        await save('access_token', "");
        await save('user_name', "");
        router.push('/');
    } catch (error) {
        console.log(error)
    }
  }

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
          containerStyles="bg-red-300"
          handlePress={() => {logOut()}}
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
