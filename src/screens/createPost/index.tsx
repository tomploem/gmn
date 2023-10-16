import {Pressable, SafeAreaView, Text, View} from "react-native";
import {Props} from "../../typings/router";
import React, { useState} from "react";
import tailwind from "twrnc";

import {useIpfs} from "../../hooks/useIpfs";
import {LoadingOutlined} from "../../components/icons/LoadingOutlined";
import ContentPicker from "./contentUploader";
import {GetLocation} from "../../components/location";

export default function CreatePost ({ navigation }: Props<'CreatePost'>) {
  const [location, setLocation] = useState<any>();
  const { upload, loading, data, error } = useIpfs();

  async function addPost () {
    try {
      await upload({ latitude: location.latitude })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView >
      <View style={tailwind`px-6 py-12 h-full`}>
        <Text style={tailwind`font-bold text-xl mb-10`}>Create Post</Text>
        <GetLocation location={location} setLocation={setLocation} />
        <View>
          <Text>{JSON.stringify(error)}</Text>
          <Text>{data}</Text>
        </View>
        <Pressable
          disabled={loading}
          style={tailwind`w-full mt-auto ${loading ? 'bg-gray-600' : 'bg-black'} py-3.5 border-0 rounded flex items-center`}
          onPress={addPost}>
            {
              loading ? <LoadingOutlined /> :
                <Text style={tailwind`text-white font-bold`}>Create</Text>
            }
        </Pressable>
      </View>
    </SafeAreaView>
  )
}
