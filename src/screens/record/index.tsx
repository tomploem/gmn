import {Text, View} from "react-native";
import {Props} from "../../typings/router";
import React, {useEffect} from "react";
import tailwind from "twrnc";
import {Camera, useCameraDevice, useCameraPermission} from "react-native-vision-camera";


export default function Record ({ route }: Props<'SecondPage'>) {
  const device = useCameraDevice('back')
  const { hasPermission, requestPermission } = useCameraPermission()

  useEffect(() => {
    if (!hasPermission) {
      handleRequestPermission()
    }
  }, [hasPermission]);

  async function handleRequestPermission () {
    const response = await requestPermission();
  }

  if (device == null) return <View style={tailwind`bg-gray-200 h-full w-full`}><Text>hello</Text></View>
  return (
    <Camera
      style={tailwind`absolute inset-0`}
      device={device}
      isActive={true}
    />
  )
}
