import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import ChatComponent from "./components/ChatComponent";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {fetchChannels} from "../states/channelSlice";

const ViewChatsScreen = ({ navigation }) => {
  const [token, setToken] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [channels, setChannels] = useState(null);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.token);
  


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    // axios
    //   .post(
    //     "http://172.20.10.3:5000/channel/getChannels",
    //     {},
    //     {
    //       headers: {
    //         Authorization: "Bearer " + auth,
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     if (res.data.channels[0] !== undefined) {
    //       setChannels(res.data.channels);
    //     }
    //     // change only if the res.data.channels is not empty list

    //     setRefreshing(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setRefreshing(false);
    //   });
    
    // from the channelSlice
    // fetchchannels from channelSlice
    dispatch(fetchChannels());
    setRefreshing(false);

  }, []);

  useEffect(() => {
    if (token) {
      axios
        .post(
          "http://172.20.10.3:5000/channel/getChannels",
          {},
          {
            headers: {
              Authorization: "Bearer " + auth,
            },
          }
        )
        .then((res) => {
          if (res.data.channels[0] !== undefined) {
            setChannels(res.data.channels);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [auth]);

  const mapChannels = () => {
    return channels.map((channel) => {
      return (
        <ChatComponent
          key={channel._id}
          name={channel.name}
          description = {channel.description}
          message={channel.lastMessage}
          time={channel.lastMessageTime}
          notification={true}
          navigation={navigation}
        />
      );
    });
  };
  return (
    <View>
      <View style={styles.topMenu}>
        <Ionicons name="options" size={24} color="black" />
        <Text style={{ color: "black", fontSize: 20, fontWeight: 700 }}>
          Chats
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("add-chat-screen")}>
          <Ionicons name="add-circle-sharp" size={26} color="#0096FF" />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.chatContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {channels ? mapChannels() : <Text>no chats</Text>}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  topMenu: {
    height: "12%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 10,
    backgroundColor: "white",
    borderBottomWidth: 0.5,
    borderBlockColor: "#e3e3e3",
  },
  chatContainer: {
    height: "88%",
    backgroundColor: "white",
  },
});

export default ViewChatsScreen;
