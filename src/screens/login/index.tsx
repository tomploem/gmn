import {Pressable, SafeAreaView, Text, View} from "react-native";
import React from "react";
import {Props} from "../../typings/router";
import tailwind from "twrnc";
import {useMetaMask} from "../../providers/useMetaMask";
import {Button} from "../../components/button";


export default function Login (_: Props<'Login'>) {
  const { login } = useMetaMask();

  function handleLogin () {
    login()
  }

  return (
    <SafeAreaView >
      <View style={tailwind`px-6 py-12 flex-col h-full justify-center items-center`}>
        <Text style={tailwind`font-bold text-2xl text-center mb-1`}>Welcome to GMN</Text>
        <Text style={tailwind`text-sm px-4 text-gray-600 text-center mb-10`}>Create your account or sign into an existing account to publish and gate-keep media.</Text>
        <Button onPress={handleLogin} label="Login" />
      </View>
    </SafeAreaView>
  )
}

