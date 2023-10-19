import {Pressable, SafeAreaView, Text, View} from "react-native";
import React from "react";
import {Props} from "../../typings/router";
import tailwind from "twrnc";
import {LeftOutlined} from "../../components/icons/LeftOutlined";
import {PageHeader} from "../../components/pageHeader";


export default function PostPage ({ route, navigation }: Props<'Post'>) {

  return (
    <SafeAreaView>
      <View style={tailwind`px-4 py-6 h-full`}>
        <PageHeader label="Post" action={() =>  navigation.navigate('Home')} />
        <View style={tailwind`bg-white p-4 rounded w-full mb-10`}>
          <Text style={tailwind`font-bold text-lg`}>{route.params.id}</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}
