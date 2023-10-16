import {SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {Props} from "../../typings/router";
import tailwind from "twrnc";


export default function Home ({ navigation }: Props<'Home'>) {

  function handleOnPress () {
    navigation.navigate('CreatePost', { id: 'testId' })
  }

  return (
    <SafeAreaView >
      <View style={tailwind`px-6 py-12`}>
        <TouchableOpacity onPress={() => handleOnPress()}>
          <Text>Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
