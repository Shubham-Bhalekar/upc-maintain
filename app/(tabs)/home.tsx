import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import debounce from "debounce";
import { StatusBar } from "expo-status-bar";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import constants from "@/constants/constants";
import { fetchData, postData, putData } from "@/lib/api";
import { AxiosError } from "axios";

interface IMessage {
  type: "success" | "warning" | "error" | "info" | "";
  text: string;
}

const Home = () => {
  const [facing, setFacing]: any = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
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

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current: any) => (current === "back" ? "front" : "back"));
  }

  const onScanned = async (scanningResult: any) => {
    console.log("scanningResult: ", scanningResult);
    if (scanningResult.data) {
      try {
        const result = await fetchData(
          `${constants.API_PATH}${constants.UPC_PATH}/${scanningResult.data}`,
          true
        );
        if (result) {
          setForm({ ...form, code: scanningResult.data, name: result.name });
          setExist(true);
          setChecked(true);
          setDisplayMessage(true);
          setMessage({ type: "success", text: "Product found!" });
        }
      } catch (error: AxiosError | any) {
        if (error.response.status === 404) {
          console.log("NotFound: ", error.response.status);
          setForm({ ...form, code: scanningResult.data, name: "" });
          setExist(false);
          setChecked(true);
          setDisplayMessage(true);
          setMessage({
            type: "success",
            text: "Product Not Found! Create new entry.",
          });
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

  const debouncedScan: any = debounce(onScanned, 500);

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
    } finally {
      setForm({ ...form, code: "", name: "" });
      setExist(false);
      setChecked(false);
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
    <SafeAreaView className="w-full h-full mt-8">
      {Platform.OS === "web" ? (
        <View className="w-full h-full justify-center items-center text-xl text-primary font-psemibold">
          <Text>Camera Scan not configured for web yet. Try Manual Entry.</Text>
        </View>
      ) : (
        <>
          <View className="w-full h-[30%] p-2">
            <CameraView
              style={styles.camera}
              facing={facing}
              barcodeScannerSettings={{
                barcodeTypes: ["upc_a"],
              }}
              onBarcodeScanned={debouncedScan}
            >
              <View
                className="justify-center items-center"
                style={styles.buttonContainer}
              >
                <TouchableOpacity
                  style={styles.button}
                  onPress={toggleCameraFacing}
                >
                  <Text style={styles.text}>Flip Camera</Text>
                </TouchableOpacity>
                <View className="w-[70%] h-[100%] absolute border border-green-700" />
              </View>
            </CameraView>
          </View>
          <ScrollView>
            <View
              className={`${"w-full"} justify-center items-center mt-4 p-5`}
            >
              {displayMessage && inlineMessage()}
              {/* <FormField
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
              /> */}
              <View className="w-full">
                <Text className=" text-xl text-primary font-pextralight">
                  UPC Code
                </Text>
                <Text className="text-xl font-pmedium">
                  {form.code ? form.code : "Scan new UPC code"}
                </Text>
              </View>
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
          </ScrollView>
          <StatusBar backgroundColor="#F5F5F5" style="dark" />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 30,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export default Home;
