import {SafeAreaView, View} from "react-native";
import React from "react";
import {Props} from "../../typings/router";
import tailwind from "twrnc";
import MapView from 'react-native-maps';


export default function Home ({ navigation }: Props<'Home'>) {

  function handleOnPress () {
    navigation.navigate('CreatePost', { id: 'testId' })
  }

  return (
    <SafeAreaView >
      <View style={tailwind`px-6 py-12 h-full`}>
        <MapView
          style={tailwind`h-full w-full`}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    </SafeAreaView>
  )
}
