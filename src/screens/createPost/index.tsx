import { Pressable, Text, View} from "react-native";
import {Props} from "../../typings/router";
import React, {useEffect, useState} from "react";
import tailwind from "twrnc";

import * as Location from 'expo-location';
import {useIpfs} from "../../hooks/useIpfs";
import {LoadingOutlined} from "../../components/icons/LoadingOutlined";

export default function CreatePost ({ route }: Props<'CreatePost'>) {
  const [location, setLocation] = useState<any>();
  const { upload, loading, data, error } = useIpfs();

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

  async function addPost () {
    try {
      await upload({ latitude: location.latitude })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={tailwind`p-6`}>
      <Text style={tailwind`font-bold text-xl mb-10`}>Create Post</Text>
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
      <View>
        <Text>{JSON.stringify(error)}</Text>
        <Text>{data}</Text>
      </View>
      <Pressable
        disabled={loading}
        style={tailwind`w-full ${loading ? 'bg-gray-600' : 'bg-black'} py-3 border-0 rounded flex items-center`}
        onPress={addPost}>
          {
            loading ? <LoadingOutlined /> :
              <Text style={tailwind`text-white font-bold`}>Create Post</Text>
          }
      </Pressable>
    </View>
  )
}
