import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import React from "react";
import {NavigationContainer, } from "@react-navigation/native";
import Home from "../screens/home";
import Login from "../screens/login";
import CreatePost from "../screens/createPost";
import {useMetaMask} from "../providers/useMetaMask";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export function RouteWrapper () {
  const { isAuthenticated } = useMetaMask();
  return (
    <NavigationContainer>
      {
        !isAuthenticated ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="Login"
              // @ts-ignore
              component={Login}
            />
          </Stack.Navigator>
        ) : (
          <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
              name="Home"
              // @ts-ignore
              component={Home}
            />
            <Tab.Screen
              name="CreatePost"
              // @ts-ignore
              component={CreatePost}
            />
          </Tab.Navigator>
        )
      }
    </NavigationContainer>
  )
}
