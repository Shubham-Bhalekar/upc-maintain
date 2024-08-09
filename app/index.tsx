import CustomButton from "@/components/CustomButton";
import  { useGlobalContext } from "@/context/GlobalContext";
import { getUserData } from "@/lib/secure-store";
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Platform, SafeAreaView, Text, View } from "react-native";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  useGlobalContext();

  const checkUser = async () => {
    const { access_token, user_name }: any = await getUserData();
    if (access_token && user_name) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkUser();
  });

  if (!loading && loggedIn) return <Redirect href={"/home"} />;

  return (
    <SafeAreaView
      className="bg-background p-2 h-full"
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? (
        <Text className="text-5xl text-secondary-200">Welcome</Text>
      ) : (
        <>
          <Text className="mt-2 text-3xl text-red-900 font-pextrabold">
            UPC Maintain
          </Text>

          <View
            className={`${Platform.OS === "web" ? "w-[80vh]" : "w-full"} p-5`}
          >
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
              handlePress={() => {
                router.push("/sign-up");
              }}
              isLoading={false}
              textStyles="text-black"
            />
          </View>
        </>
      )}
      <StatusBar backgroundColor="#F5F5F5" style="dark" />
    </SafeAreaView>
  );
}
