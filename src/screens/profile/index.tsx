import {SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {Props} from "../../typings/router";
import tailwind from "twrnc";


export default function Profile ({ navigation }: Props<'Profile'>) {

  function handleOnPress () {
    navigation.navigate('CreatePost', { id: 'testId' })
  }

  return (
    <SafeAreaView >
      <View style={tailwind`px-6 py-12`}>
        <TouchableOpacity onPress={() => handleOnPress()}>
          <Text>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
