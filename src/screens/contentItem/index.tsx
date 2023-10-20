import {Image, ImageBackground, Pressable, SafeAreaView, Text, View} from "react-native";
import React from "react";
import {Props} from "../../typings/router";
import tailwind from "twrnc";
import {LeftOutlined} from "../../components/icons/LeftOutlined";
import {PageHeader} from "../../components/pageHeader";
import {LockOutlined} from "../../components/icons/LockOutlined";
import {Button} from "../../components/button";
import {useIpfsRead} from "../../hooks/useIpfsRead";
import {LoadingOutlined} from "../../components/icons/LoadingOutlined";
import {LocationOutlined} from "../../components/icons/LocationOutlined";
import {ContentUsage} from "./usage";
import {ContentItemHeader} from "./Header";

export default function ContentItemPage ({ route, navigation }: Props<'ContentItem'>) {

  const { data, loading } = useIpfsRead<string>("QmeMoD6yxtLMLyrvnerVxGcoPfjRzMmMYx3uzqkhf9ond6");

  return (
    <SafeAreaView>
      <View style={tailwind`px-4 py-6 bg-white h-full`}>
        <PageHeader label={`ID: ${route.params.id}`} action={() =>  navigation.navigate('Home')} />
        <ContentItemHeader loading={loading} imgData={data} />
        <View style={tailwind`bg-white py-4 flex-row items-center rounded w-full mb-10`}>
          <LocationOutlined
            width={18}
            height={18}
            style={tailwind`text-black`}
          />
          <Text style={tailwind`ml-2 text-xs text-gray-700`}>Wollemarkt 23, 2800 Mechelen</Text>
        </View>
        <ContentUsage />
        <View style={tailwind`mt-auto`}>
          <Button onPress={() => ''} label="Start writing" />
        </View>
      </View>
    </SafeAreaView>
  )
}
