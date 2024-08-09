import { View, Text, Image, Platform } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import icons from "../../constants/icons";
import GlobalProvider from "@/context/GlobalContext";

const TabIcon = ({ icon, color, name, focused }: any) => {
  // if (Platform.OS === "web" && name === "Scan") {
  //   return null;
  // } else {
  return (
    <View className="items-center justify-center gap-1">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{
          color: color,
        }}
      >
        {name}
      </Text>
    </View>
  );
  // }
};

const TabsLayout = () => {
  return (
    <GlobalProvider>
      <>
        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#FFA001",
            tabBarInactiveTintColor: "#CDCDE0",
            tabBarStyle: {
              backgroundColor: "#161622",
              borderTopWidth: 1,
              borderTopColor: "#232533",
              height: 84,
            },
          }}
        >
          {/* {Platform.OS !== "web" && ( */}
            <Tabs.Screen
              name="home"
              options={{
                title: "Scan",
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                  <TabIcon
                    icon={icons.eye}
                    color={color}
                    name="Scan"
                    focused={focused}
                  />
                ),
              }}
            />
          {/* )} */}
          <Tabs.Screen
            name="manual-entry"
            options={{
              title: "Manual",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.plus}
                  color={color}
                  name="Manual"
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: "Settings",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.profile}
                  color={color}
                  name="Settings"
                  focused={focused}
                />
              ),
            }}
          />
        </Tabs>
      </>
    </GlobalProvider>
  );
};

export default TabsLayout;
