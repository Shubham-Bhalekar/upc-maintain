import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import icons from "@/constants/icons";

interface IProps {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (e: any)=>void;
  otherStyles: string;
}

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}: IProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="p-1 text-xl text-primary font-pextralight">{title}</Text>
      <View className=" border-2 border-black-200 w-full h-16 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row px-4">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8d"}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />

        {title ==="Password" && (
            <TouchableOpacity onPress={()=>setShowPassword(!showPassword)}>
                <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode="contain"/>
            </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
