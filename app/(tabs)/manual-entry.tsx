import { View, Text, Platform, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import icons from "@/constants/icons";
import CustomButton from "@/components/CustomButton";
import { fetchData, postData, putData } from "@/lib/api";
import constants from "@/constants/constants";
import { AxiosError } from "axios";
import { StatusBar } from "expo-status-bar";
// import alert from "@/lib/alert";
import { logOut } from "@/lib/utils";

interface IMessage {
  type: "success" | "warning" | "error" | "info" | "";
  text: string;
}

const ManualEntry = () => {
  const [form, setForm] = useState({
    code: "",
    name: "",
  });
  const [exist, setExist] = useState(false);
  const [checked, setChecked] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [message, setMessage] = useState<IMessage>({
    type: "",
    text: "",
  });
  const handleOnCodeSubmit = async () => {
    if (form.code) {
      try {
        const result = await fetchData(
          `${constants.API_PATH}${constants.UPC_PATH}/${form.code}`,
          true
        );
        if (result) {
          setForm({ ...form, name: result.name });
          setExist(true);
          setChecked(true);
          setDisplayMessage(true);
          setMessage({ type: "success", text: "Product found!" });
        }
      } catch (error: AxiosError | any) {
        if (error.response.status === 404) {
          setForm({ ...form, name: "" });
          setExist(false);
          setChecked(true);
          setDisplayMessage(true);
          setMessage({
            type: "success",
            text: "Product Not Found! Create New.",
          });
        } else if (error.response.status === 401) {
          alert(
            "Session Expired. Please log in again.",
          );
          await logOut();
        } else {
          throw new Error(error);
        }
      }
    } else {
      setExist(false);
      setChecked(false);
      setDisplayMessage(true);
      setMessage({
        type: "warning",
        text: "Product code should not be empty.",
      });
    }
  };

  const handleProductSubmit = async () => {
    try {
      if (!exist) {
        const result = await postData(
          `${constants.API_PATH}${constants.UPC_PATH}`,
          { code: form.code, name: form.name },
          true
        );
        if (result) {
          setDisplayMessage(true);
          setMessage({ type: "success", text: "Successfully added!" });
        }
      } else {
        const result = await putData(
          `${constants.API_PATH}${constants.UPC_PATH}`,
          { code: form.code, name: form.name },
          true
        );
        if (result) {
          setDisplayMessage(true);
          setMessage({ type: "success", text: "Successfully updated!" });
        }
      }
    } catch (error: AxiosError | any) {
      if (error.response.status === 409) {
        setDisplayMessage(true);
        setMessage({
          type: "error",
          text: "Product with UPC code already exists.",
        });
      } else {
        throw new Error(`${error}`);
      }
    }
  };

  const inlineMessage = () => {
    return (
      <View
        className={`bg-${message.type} w-full flex-row justify-center items-center rounded-xl mb-3 border border-s border-gray-400`}
      >
        <Text className="w-[90%] p-2 pl-4">{message.text}</Text>
        <TouchableOpacity
          className="bg-secondary-100 w-[10%] items-center justify-center p-3 rounded-r-xl"
          onPress={() => {
            setDisplayMessage(false);
          }}
        >
          <Text className="text-white font-pbold">x</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView className="bg-background h-full justify-center items-center">
      <Text className="text-xl font-psemibold">Enter Product Information</Text>
      <View
        className={`${
          Platform.OS === "web" ? "w-[90vh]" : "w-full"
        } justify-center items-center mt-4 p-5`}
      >
        {displayMessage && inlineMessage()}
        <FormField
          handleChangeText={(e) => {
            setForm({ ...form, code: e });
          }}
          otherStyles="w-full"
          placeholder=""
          title="UPC Code"
          value={form.code}
        />
        <CustomButton
          containerStyles="bg-secondary  w-[50%]"
          handlePress={async () => {
            await handleOnCodeSubmit();
          }}
          isLoading={false}
          textStyles=""
          title="Search"
          //   icon={icons.search}
        />
        {checked && (
          <>
            <FormField
              handleChangeText={(e) => {
                setForm({ ...form, name: e });
              }}
              otherStyles="w-full mt-5"
              placeholder=""
              title="Product Name"
              value={form.name}
            />
            <CustomButton
              containerStyles="bg-secondary"
              handlePress={async () => {
                await handleProductSubmit();
              }}
              isLoading={false}
              textStyles=""
              title={exist ? "Update" : "Submit"}
              //   icon={icons.search}
            />
          </>
        )}
      </View>
      <StatusBar backgroundColor="#F5F5F5" style="dark" />
    </SafeAreaView>
  );
};

export default ManualEntry;
