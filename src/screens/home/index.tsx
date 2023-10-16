import {SafeAreaView, View} from "react-native";
import React from "react";
import {Props} from "../../typings/router";
import tailwind from "twrnc";

import Mapbox from '@rnmapbox/maps';
import Config from "react-native-config";

Mapbox.setAccessToken(Config.MAPBOX_API_KEY || '');


export default function Home ({ navigation }: Props<'Home'>) {

  function handleOnPress () {
    navigation.navigate('CreatePost', { id: 'testId' })
  }

  return (
    <SafeAreaView >
      <View style={tailwind`h-full`}>
        <Mapbox.MapView  style={tailwind`h-full flex-1 w-full`} />
      </View>
    </SafeAreaView>
  )
}
