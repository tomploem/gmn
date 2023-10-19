import tailwind from "twrnc";
import {LoadingOutlined} from "../icons/LoadingOutlined";
import {Pressable, Text} from "react-native";
import React, {ReactNode} from "react";

interface ButtonProps {
  onPress(): void;
  loading?: boolean;
  disabled?: boolean;
  label: string;
}

export function Button ({ onPress, disabled = false, loading = false, label }: ButtonProps) {
  const isInactive = loading || disabled;
  return (
    <Pressable
      disabled={disabled}
      style={tailwind`w-full ${isInactive ? 'bg-gray-600' : 'bg-black'} py-3.5 border-0 rounded flex items-center`}
      onPress={onPress}>
        {
          loading
          ? <LoadingOutlined />
          :  <Text style={tailwind`text-white capitalize font-bold`}>{label}</Text>
        }
    </Pressable>
  )
}
