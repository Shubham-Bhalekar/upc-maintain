import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import { postData } from "@/lib/api";
import constants from "@/constants/constants";

const LogIn = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const signIn = async () => {
    const res = await postData(`${constants.API_PATH}${constants.LOG_IN_PATH}`, {
      username: form.username,
      password: form.password,
    });
    console.log('res: ', res);
  };

  useEffect(() => {
    console.log(form);
  });

  return (
    <SafeAreaView className="bg-background h-full">
      <View className="flex-1 justify-center items-center p-4">
        <Text className="mt-2 text-3xl text-secondary-200 font-pbold mb-4">
          UPC Maintain
        </Text>
        <View className="w-full border border-black rounded-xl p-4 justify-center items-center">
          {/* <Text className="text-4xl font-pbold">Log In</Text> */}
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
              handlePress={() => {signIn()}}
              isLoading={false}
              textStyles="text-black"
              title="Log In"
            />
          </View>
        </View>
        <Link className="text-xl mt-4 text-amber-700" href={"/"}>
          Don't have an account? Sign Up.
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default LogIn;
