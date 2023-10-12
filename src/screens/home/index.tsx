import {Text, TouchableOpacity, View} from "react-native";
import React from "react";


export default function Home ({ navigation }: any) {

  function handleOnPress () {
    navigation.navigate('SecondPage')
  }

  return (
    <View>
      <TouchableOpacity onPress={() => handleOnPress()}>
        <Text>Home</Text>
      </TouchableOpacity>
    </View>
  )
}
