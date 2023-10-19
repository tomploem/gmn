import {Image, Pressable, SafeAreaView, Text, View} from "react-native";
import React from "react";
import {Props} from "../../typings/router";
import tailwind from "twrnc";
import {LeftOutlined} from "../../components/icons/LeftOutlined";
import {PageHeader} from "../../components/pageHeader";
import {LockOutlined} from "../../components/icons/LockOutlined";
import {Button} from "../../components/button";
import {useIpfsRead} from "../../hooks/useIpfsRead";
import {LoadingOutlined} from "../../components/icons/LoadingOutlined";

export default function PostPage ({ route, navigation }: Props<'Post'>) {

  const { data, loading } = useIpfsRead("QmeMoD6yxtLMLyrvnerVxGcoPfjRzMmMYx3uzqkhf9ond6");

  return (
    <SafeAreaView>
      {
        loading
          ? (
            <View>
              <LoadingOutlined />
            </View>
          )
          : (
            <View style={tailwind`px-4 py-6 bg-white h-full`}>
              <PageHeader label="Post" action={() =>  navigation.navigate('Home')} />
              <View style={tailwind`bg-gray-100 rounded aspect-video flex items-center justify-center`}>
                <LockOutlined width={50} height={50} style={tailwind`text-gray-300`} />
              </View>
              <View style={tailwind`bg-white p-4 rounded w-full mb-10`}>
                <Text style={tailwind`font-bold text-sm`}>ID: {route.params.id}</Text>
              </View>
              <Image style={tailwind`w-20 h-20`} source={{ uri: `data:image/png;base64,${data}` }} />
              <View style={tailwind`mt-auto`}>
                <Button onPress={() => ''} label="Buy" />
              </View>
            </View>
          )
      }

    </SafeAreaView>
  )
}
