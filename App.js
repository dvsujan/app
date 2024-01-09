import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import * as SecureStore from "expo-secure-store";
import ChatScreen from "./screens/ChatScreen";
import GroupInfoScreen from "./screens/GroupInfoScreen";
import store from "./store";
import { Provider } from 'react-redux';
import AddChat from "./screens/AddChat";
async function getToken() {
  const token = await SecureStore.getItemAsync("auth-token");
  return token;
}
const Stack = createNativeStackNavigator();

export default function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getToken().then((token) => {
      if (token) {
        setIsLogged(true);
      }
      setLoading(false);
    });
  }, []);
  
  return (
     <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="welcome-screen" component={WelcomeScreen} />
        <Stack.Screen name="home-screen" component={HomeScreen} />
        <Stack.Screen name="login-screen" component={LoginScreen} />
        <Stack.Screen name="register-screen" component={RegisterScreen} />
        <Stack.Screen name="chat-screen" component={ChatScreen} />
        <Stack.Screen name="group-info-screen" component={GroupInfoScreen} />
        <Stack.Screen name="add-chat-screen" component={AddChat} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
  );
}
