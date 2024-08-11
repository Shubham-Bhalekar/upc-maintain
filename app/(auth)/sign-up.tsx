import { View, Text, SafeAreaView, Platform, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import { postData } from "@/lib/api";
import constants from "@/constants/constants";
import { getValueFor, save } from "@/lib/secure-store";
import { router } from "expo-router";
import alert from "@/lib/alert";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const signUp = async () => {
    try {
      const res = await postData(
        `${constants.API_PATH}${constants.SIGN_UP_PATH}`,
        {
          username: form.username,
          password: form.password,
        }
      );
      router.push('/log-in');
    } catch (error) {
      alert("Error", `${error}`);
    }
  };

  return (
    <SafeAreaView className="bg-background h-full">
      <View className="flex-1 justify-center items-center p-4">
        <Text className="mt-2 text-3xl text-secondary-200 font-pbold mb-4">
          UPC Maintain
        </Text>
        <View
          className={`${
            Platform.OS === "web" ? "w-[90vh]" : "w-full"
          } border border-black rounded-xl p-4 justify-center items-center`}
        >
          <Text className="text-2xl font-pbold">Register</Text>
          <View className="w-full">
            <FormField
              handleChangeText={(e) => setForm({ ...form, username: e })}
              otherStyles="mb-4"
              placeholder="Enter Username"
              title="Username"
              value={form.username}
              key="uname"
            />
            <FormField
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mb-4"
              placeholder="Enter Password"
              title="Password"
              value={form.password}
              key="pname"
            />
            <CustomButton
              containerStyles="bg-secondary-100"
              handlePress={() => {
                signUp();
              }}
              isLoading={false}
              textStyles="text-black"
              title="Sign Up"
            />
          </View>
        </View>
        <Link className="text-xl mt-4 text-amber-700" href={"/log-in"}>
          Already have an account? Log In.
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
