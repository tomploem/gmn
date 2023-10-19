import {Animated, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import tailwind from "twrnc";

import * as Location from 'expo-location';
import {LocationObjectCoords} from "expo-location";
import Config from "react-native-config";
import {LoadingOutlined} from "../icons/LoadingOutlined";

interface GetLocationProps {
  setCoordinates(location: LocationObjectCoords): void;
  coordinates?: LocationObjectCoords;
}

export function GetLocation ({ setCoordinates, coordinates }: GetLocationProps) {
  const [address, setAddress] = useState();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (!coordinates) return;
    fetchAddress(coordinates);
  }, [coordinates]);

  async function fetchAddress(location: LocationObjectCoords) {
    try {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location.longitude},${location.latitude}.json?access_token=${Config.MAPBOX_API_KEY || ''}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        // Grab the first result
        const address = data.features[0].place_name;
        setAddress(address);
      } else {
        throw new Error("Could not fetch address");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }


  async function getLocation () {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      // setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setCoordinates(location.coords);
  }

  return (
    <View style={tailwind`flex-col p-4 bg-gray-100 border border-gray-50 rounded mb-4`}>
      <View style={tailwind`text-sm`}>
        <Text style={tailwind`font-bold text-xs mb-1`}>Address</Text>
        {
          loading ? <LoadingOutlined /> : <Text style={tailwind`text-xs text-gray-700`}>{address}</Text>
        }
      </View>
    </View>
)
}
