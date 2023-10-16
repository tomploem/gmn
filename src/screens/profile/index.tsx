import {SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {Props} from "../../typings/router";
import tailwind from "twrnc";
import {Button} from "../../components/button";


export default function Profile ({ navigation }: Props<'Profile'>) {

  function handleLogout () {
    // navigation.navigate('CreatePost', { id: 'testId' })
  }

  return (
    <SafeAreaView >
      <View style={tailwind`px-4 py-12 h-full`}>
        <View style={tailwind`bg-white p-4 rounded w-full mb-10`}>
          <Text style={tailwind`font-bold text-lg=`}>Settings</Text>
        </View>
        <Button onPress={handleLogout} label="logout" />
      </View>
    </SafeAreaView>
  )
}
