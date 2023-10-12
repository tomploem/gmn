import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import Home from "../screens/home";
import SecondPage from "../screens/second-page";


const Stack = createNativeStackNavigator();

export function RouteWrapper () {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{navigationBarHidden: true}}>
        <Stack.Screen
          name="Home"
          // @ts-ignore
          component={Home}
        />
        <Stack.Screen
          name="SecondPage"
          // @ts-ignore
          component={SecondPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
