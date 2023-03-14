import { NavigationContainer } from "@react-navigation/native"
import { createSharedElementStackNavigator } from "react-navigation-shared-element"

import { StackScreenProps } from "@react-navigation/stack"
import React from "react"

import DetailsScreen from "../screens/DetailsScreen"
import HomeScreen from "../screens/HomeScreen"

import { navigationRef } from "./navigationUtilities"

export type AppStackParamList = {
  Home: undefined
  Details: undefined
}

export type AppStackScreenProps<T extends keyof AppStackParamList> = StackScreenProps<
  AppStackParamList,
  T
>

const Stack = createSharedElementStackNavigator<AppStackParamList>()

const AppStack = function AppStack() {
  const options = {
    transitionSpec: {
      open: { animation: "timing", config: { duration: 400 } },
      close: { animation: "timing", config: { duration: 400 } },
    },
    cardStyleInterpolator: ({ current: { progress } }) => {
      return {
        cardStyle: {
          opacity: progress,
        },
      }
    },
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"Home"}>
      <Stack.Screen name="Home" component={HomeScreen} />

      <Stack.Screen name="Details" component={DetailsScreen} options={options} />
    </Stack.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = function AppNavigator(props: NavigationProps) {
  return (
    <NavigationContainer ref={navigationRef} {...props}>
      <AppStack />
    </NavigationContainer>
  )
}
