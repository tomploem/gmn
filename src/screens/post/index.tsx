import {Pressable, SafeAreaView, Text, View} from "react-native";
import React from "react";
import {Props} from "../../typings/router";
import tailwind from "twrnc";
import {Button} from "../../components/button";
import {LeftOutlined} from "../../components/icons/LeftOutlined";


export default function PostPage ({ route, navigation }: Props<'Post'>) {

  return (
    <SafeAreaView >
      <View style={tailwind`px-4 py-6 h-full`}>
        <View style={tailwind`flex-row justify-between mb-4`}>
          <Pressable onPress={() =>  navigation.navigate('Home')}>
            <LeftOutlined style={tailwind`text-black`} />
          </Pressable>
          <Text style={tailwind`font-bold text-center mr-6`}>Post</Text>
          <View />
        </View>
        <View style={tailwind`bg-white p-4 rounded w-full mb-10`}>
          <Text style={tailwind`font-bold text-lg`}>{route.params.id}</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}
