import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import UserComponent from "./components/UserComponent";
import { searchUser } from "../services/SerchUser";
import { useDispatch, useSelector } from "react-redux";

const AddChat = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const auth = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (search.length > 0) {
      setLoading(true);
      searchUser(search, auth).then((res) => {
        setUsers(res);
        setLoading(false);
      });
    }
  }, [search]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          onChangeText={(text) => setSearch(text)}
          value={search}
        />
        {loading && <ActivityIndicator />}
      </View>
      <ScrollView style={styles.scrollArea}>
        {users.map((user) => (
          <UserComponent
            key={user._id}
            name={user.username}
            dp={user.dp}
            _id={user._id}
            navigation={navigation}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
  },
  scrollArea: {
    flex: 1,
  },
});

export default AddChat;
