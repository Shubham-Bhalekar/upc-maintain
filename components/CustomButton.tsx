import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface IProps {
  title: string;
  handlePress: () => void;
  containerStyles: string;
  textStyles: string;
  isLoading: boolean;
}

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
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
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
