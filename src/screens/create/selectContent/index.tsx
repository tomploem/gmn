import {Text, View} from "react-native";
import React, {useEffect} from "react";
import tailwind from "twrnc";
import * as ImagePicker from 'expo-image-picker';

import {Button} from "../../../components/button";
import {VideoCameraOutlined} from "../../../components/icons/VideoCameraOutlined";
import {useIpfsWrite} from "../../../hooks/useIpfsWrite";

interface SelectContentProps {
  imageCid?: string;
  setImageCid(image: string): void;
}

export default function SelectContent ({ imageCid, setImageCid }: SelectContentProps) {
  const { upload, loading, data, error } = useIpfsWrite<string>('image');

  useEffect(() => {
    if (data && data?.length > 0) {
      setImageCid(data);
    }
  }, [data]);

  const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.canceled) {
      upload({
        uri: result.assets[0].uri,
      })
    }
  };

  return (
    <View style={tailwind`h-full bg-white flex-col p-4 items-center justify-between`}>
      <View />
      <View style={tailwind`flex-col items-center mt-6 px-4`}>
        <View style={tailwind`bg-gray-300 rounded-full mb-2`}>
          <VideoCameraOutlined width={30} height={30} style={tailwind`text-gray-500 m-4`} />
        </View>
        <Text style={tailwind`font-bold text-lg mb-1`}>Select an image of video</Text>
        <Text style={tailwind`text-sm text-center px-2 text-gray-600 mb-10`}>Start your upload by selecting the content you'd like to monitize. This can be an event happening near you and any other.</Text>
      </View>
      <View style={tailwind` w-full`}>
        <Button loading={loading} label="Upload Content" onPress={pickImage} />
      </View>
    </View>
  )
}
