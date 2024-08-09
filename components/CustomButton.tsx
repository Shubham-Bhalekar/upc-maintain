import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

interface IProps {
  title: string;
  handlePress: () => void;
  containerStyles: string;
  textStyles: string;
  isLoading: boolean;
  icon?: any;
}

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  icon,
}: IProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-primary rounded-xl min-h-[62px] justify-center items-center w-full mt-4 ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
        {icon && <Image source={icon} className=" ml-1 w-3 h-3" resizeMode="contain" tintColor={'#fff0f0'}/>}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
