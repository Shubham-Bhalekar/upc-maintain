import { router } from "expo-router";
import { save } from "./secure-store";

export const logOut = async () => {
  try {
    await save("access_token", "");
    await save("user_name", "");
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};
