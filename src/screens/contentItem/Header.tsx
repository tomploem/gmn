import {PageHeader} from "../../components/pageHeader";
import {Image, View} from "react-native";
import tailwind from "twrnc";
import {LoadingOutlined} from "../../components/icons/LoadingOutlined";
import React from "react";

type ContentItemHeaderProps = {
  loading: boolean;
  imgData?: string;
}

export function ContentItemHeader ({ loading, imgData }: ContentItemHeaderProps) {
  return (
    <>
      {
        loading
          ? (
            <View style={tailwind`bg-gray-100 overflow-hidden rounded aspect-video`}>
              <View>
                <LoadingOutlined width={40} height={40} style={tailwind`text-gray-300`} />
              </View>
            </View>
          )
          : (
            <View style={tailwind`aspect-video overflow-hidden rounded`}>
              <Image
                source={{ uri: `data:image/png;base64,${imgData}` }}
                style={tailwind`w-full h-full`}
              />
            </View>
          )
      }
    </>
  )
}
