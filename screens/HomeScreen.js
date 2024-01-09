import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ViewChatsScreen from "./ViewChatsScreen";
import SettingsScreen from "./SettingsScreen";
import { setToken } from "../states/authSlice";
import { useDispatch } from "react-redux";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const getToken = async () => {
    const token = await SecureStore.getItemAsync("auth-token");
    return token;
  };
  const dispatch = useDispatch();
  useEffect(() => {
    getToken().then((token) => {
      if (token) {
        dispatch(setToken(token));
      }
    });
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="tab-chats"
        component={ViewChatsScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Chats",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbox" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="tab-settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// const styles = StyleSheet.create({
//      topMenu: {
//           height:"10%",
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "flex-end",
//         padding: 10,
//         backgroundColor: "white",
//           // border bottom of the top menu
//             borderBottomWidth: .5,
//             borderBlockColor: "#e3e3e3",
//      },

//      chatContainer: {
//           height:"85%",
//         backgroundColor:"white",
//      },
// });

export default HomeScreen;
