import {Pressable, Text, View} from "react-native";
import tailwind from "twrnc";
import {LeftOutlined} from "../icons/LeftOutlined";
import React from "react";

interface PageHeaderProps {
  label?: string;
  action(): void;
}

export function PageHeader ({ label, action }: PageHeaderProps) {
  return (
    <View style={tailwind`flex-row justify-between mb-4`}>
      <Pressable onPress={action}>
        <LeftOutlined style={tailwind`text-black`} />
      </Pressable>
      {label && <Text style={tailwind`font-bold text-center mr-6`}>{label}</Text>}
      <View />
    </View>
  )
}
