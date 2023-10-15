import { Text, View} from "react-native";
import React, { useEffect } from "react";
import tailwind from "twrnc";

import * as Location from 'expo-location';

interface GetLocationProps {
  setLocation(location: any): void;
  location: any;
}

export function GetLocation ({ setLocation, location }: GetLocationProps) {

  useEffect(() => {
    getLocation();
  }, []);

  async function getLocation () {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      // setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
  }

  return (
    <View style={tailwind`flex-col p-4 bg-white border border-gray-50 rounded mb-4 `}>
      <View style={tailwind`flex-row items-center text-sm`}>
        <Text style={tailwind`font-bold mr-2`}>longitude:</Text>
        <Text>{location?.longitude}</Text>
      </View>
      <View style={tailwind`flex-row items-center text-sm`}>
        <Text style={tailwind`font-bold mr-2`}>latitude:</Text>
        <Text>{location?.latitude}</Text>
      </View>
      <View style={tailwind`flex-row items-center text-sm`}>
        <Text style={tailwind`font-bold mr-2`}>altitude:</Text>
        <Text>{location?.altitude}</Text>
      </View>
    </View>
)
}
