import { SafeAreaView, Text, View } from "react-native";
import {Props} from "../../typings/router";
import React, { useState} from "react";
import tailwind from "twrnc";

import {useIpfs} from "../../hooks/useIpfs";
import {GetLocation} from "../../components/location";
import {Button} from "../../components/button";

export default function CreatePost (_: Props<'CreatePost'>) {
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
        <Button loading={loading} label="Create" onPress={addPost} />
      </View>
    </SafeAreaView>
  )
}
