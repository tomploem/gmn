import {  SafeAreaView, Text, View} from "react-native";
import React from "react";
import {Props} from "../../typings/router";
import tailwind from "twrnc";
import {posts} from "../../config/data/posts";

export default function ContentItemPage (_: Props<'PostItem'>) {

  const post = posts?.[0];

  return (
    <SafeAreaView>
      <View style={tailwind`bg-gray-50 mb-1 rounded p-2`}>
        <View style={tailwind`flex-row items-center mb-2`}>
          <View style={tailwind`w-6 h-6 bg-gray-900 rounded-full mr-2`} />
          <Text style={tailwind`font-medium`}>{post.company.name}</Text>
        </View>
        <View>
          <Text style={tailwind`font-bold mb-1 `}>{post.title}</Text>
          <Text style={tailwind`text-sm text-gray-600`}>{post.content?.substring(0, 100) + '..'}</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}
