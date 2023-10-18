import React, {useEffect, useState} from 'react';
import {Button, Image, Pressable, Text, View} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import tailwind from "twrnc";
import {VideoCameraOutlined} from "../icons/VideoCameraOutlined";
import {useIpfs} from "../../hooks/useIpfs";

export function UploadInput() {
  const { upload, data } = useIpfs<string>('image');
  const [image, setImage] = useState<any>(null);

  useEffect(() => {
    if (image) {
      upload({
        uri: image
      });
    }
  }, [image]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <Pressable onPress={pickImage} style={tailwind`px-2 py-2 mb-1 flex-row items-center bg-white rounded`}>
      <View style={tailwind` bg-gray-300 rounded`}>
        {
          image
            ? <Image source={{ uri: image }} style={tailwind`w-10 rounded overflow-hidden h-10`} />
            : <VideoCameraOutlined style={tailwind`text-black m-3`} />
        }

      </View>
      <Text style={tailwind`ml-4 mb-0 pb-0 leading-none`}>{data ? data : 'Pick an image from camera roll'}</Text>
    </Pressable>
  );
}
