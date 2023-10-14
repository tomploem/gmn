import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {Props} from "../../typings/router";


export default function Home ({ navigation }: Props<'Home'>) {

  function handleOnPress () {
    navigation.navigate('CreatePost', { id: 'testId' })
  }

  return (
    <View>
      <TouchableOpacity onPress={() => handleOnPress()}>
        <Text>Home</Text>
      </TouchableOpacity>
    </View>
  )
}
