import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import Home from "../screens/home";
import Login from "../screens/login";
import {useMetaMask} from "../providers/useMetaMask";
import Profile from "../screens/profile";
import {UserOutlined} from "../components/icons/UserOutlined";
import tailwind from "twrnc";
import {PlusCircleOutlined} from "../components/icons/PlusCircleOutlined";
import {IconProps} from "../components/icons/Icon";
import {LocationOutlined} from "../components/icons/LocationOutlined";
import ContentItemPage from "../screens/contentItem";
import PostItemPage from "../screens/post";
import {CreateContent} from "../screens/create";
import {Props} from "../typings/router";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function UnAuthenticatedStack () {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Login"
        // @ts-ignore
        component={Login}
      />
    </Stack.Navigator>
  )
}

const CreateNavigator = () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: "card",
        contentStyle: tailwind`bg-white/50 mt-10`,
    }}>
        <Stack.Screen
          options={{ animation: 'slide_from_bottom' }}
          name="CreateContent"
          // @ts-ignore
          component={CreateContent}
        />
    </Stack.Navigator>
);

function MapStackNavigator ({ navigation }: Props<'Home'>) {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen
        name="Home"
        // @ts-ignore
        component={Home}
      />
      <Stack.Screen
        name="ContentItem"
        // @ts-ignore
        component={ContentItemPage}
      />
      <Stack.Screen
        name="PostItem"
        // @ts-ignore
        component={PostItemPage}
      />
    </Stack.Navigator>
  );
};

export function RouteWrapper () {
  const { isAuthenticated } = useMetaMask();

  function createStyleForTabBarIcon(Icon: (props: IconProps) => React.JSX.Element, focused: boolean) {
    return <Icon style={tailwind`${focused ? 'text-black' : 'text-gray-500'}`} />
  }

  return (
    <NavigationContainer>
      {
        isAuthenticated ? (
          <UnAuthenticatedStack />
        ) : (
          <>
            <Tab.Navigator screenOptions={{
              headerShown: false,
              tabBarShowLabel: false,
            }}>
              <Tab.Screen
                name="Home"
                options={{
                  tabBarIcon: ({ focused }) => createStyleForTabBarIcon(LocationOutlined, focused)
                }}
                // @ts-ignore
                component={MapStackNavigator}
              />
              <Tab.Screen
                options={{
                  tabBarIcon: ({ focused }) => createStyleForTabBarIcon(PlusCircleOutlined, focused),
                }}

                name="CreatePost"
                component={CreateNavigator}
              />
              <Tab.Screen
                options={{
                  tabBarIcon: ({ focused }) => createStyleForTabBarIcon(UserOutlined, focused)
                }}
                name="Profile"
                // @ts-ignore
                component={Profile}
              />
            </Tab.Navigator>
          </>
        )
      }
    </NavigationContainer>
  )
}
