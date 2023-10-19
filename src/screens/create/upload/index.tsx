import { Text, View } from "react-native";
import React, {useEffect, useState} from "react";
import tailwind from "twrnc";

import {Button} from "../../../components/button";
import {GetLocation} from "../../../components/location";
import {useIpfs} from "../../../hooks/useIpfs";
import {LocationObjectCoords} from "expo-location";
import {CheckOutlined} from "../../../components/icons/CheckOutlined";

interface UploadContentProps {
  imageCid?: string;
  setLocationCid(image: string): void;
}

export default function UploadContent ({ setLocationCid, imageCid }: UploadContentProps) {

  const [coordinates, setCoordinates] = useState<LocationObjectCoords>();
  const { upload, loading, data, error } = useIpfs<string>('json');

  useEffect(() => {
    if (data && data?.length > 0) {
      setLocationCid(data);
    }
  }, [data]);

  function handleMetadataUpload () {
    upload(coordinates as Record<string, any>);
  }

  return (
      <View style={tailwind`h-full p-6 bg-white`}>
        <Text style={tailwind`font-bold text-xl mb-10`}>Create Post</Text>
        <View style={tailwind`bg-gray-100 rounded p-4 flex-row items-center mb-2`}>
          <View style={tailwind`bg-gray-200 p-1 rounded-full`}>
            <CheckOutlined width={10} height={10} style={tailwind`font-medium text-black`} />
          </View>
          <Text style={tailwind`ml-2 text-gray-500 text-sm`}>Image Upload</Text>
        </View>
        <GetLocation
          setCoordinates={setCoordinates}
          coordinates={coordinates}
        />
        <View style={tailwind`mt-auto`}>
          <Button
            disabled={loading || !coordinates}
            loading={loading}
            label="Create"
            onPress={handleMetadataUpload}
          />
        </View>
      </View>
  )
}
