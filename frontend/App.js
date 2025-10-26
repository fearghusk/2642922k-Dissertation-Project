import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ProcessingScreen from "./screens/ProcessingScreen"; 
import ResultScreen from "./screens/ResultScreen"

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Music Reader" }}
        />
        <Stack.Screen
          name="Processing"
          component={ProcessingScreen}
          options={{ title: "Processing" }}
        />
        <Stack.Screen 
          name="Result"
          component={ResultScreen} 
          options={{ title: "Result" }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
