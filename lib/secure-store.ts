import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function save(key: string, value: string) {
  await AsyncStorage.setItem(key, value);
}

export async function getValueFor(key: string) {
  try {
    let result = await AsyncStorage.getItem(key);
    if (result) {
      console.log("🔐 Here's your value 🔐 \n" + result);
    } else {
      console.log("No values stored under that key.");
    }
    return result;
  } catch (error) {
    console.log("getValueFor: ", error);
  }
}

export async function getUserData() {
  try {
    let access_token = await AsyncStorage.getItem("access_token");
    let user_name = await AsyncStorage.getItem("user_name");
    return {
      access_token,
      user_name,
    };
  } catch (error) {
    console.log("getUserData: ", error);
  }
}
