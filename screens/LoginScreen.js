import React from "react";
import { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export default function WelcomeScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleLogin = () => {
    if (!username.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setErr("Not a valid email");
      return;
    }
    if (password.length < 6 || password.length > 20) {
      setErr("password must be between 6 and 20 characters");
      return;
    }
    axios
      .post("http://172.20.10.3:5000/auth/login", { email:username, password: password })
      .then((response) => {
        if (response.status === 200) {
          navigation.reset({
            index: 0,
            routes: [{ name: "home-screen" }],
          });
        }
        save("auth-token", response.data.token); 
        setErr("");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        console.log("err code", error.response.data);
        setErr("username or password is incorrect");
        setLoading(false);
      });
  };
  
  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>Login</Text>
      {err ? (
        <Text style={{ color: "red", paddingBottom: 10 }}>{err}</Text>
      ) : null}
      <TextInput
        style={Styles.input}
        placeholder="Email"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={Styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {loading ? (
        <Button title="Loading.." disabled={true} />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
      <Text>don't have an accout ?</Text>
      <Button
        title="Register"
        style={{
          backgroundColor: "dodgerblue",
          padding: 15,
          borderRadius: 25,
          marginVertical: 10,
        }}
        onPress={() => {
          navigation.navigate("register-screen");
        }}
      ></Button>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    paddingRight: "25%",
    paddingLeft: "25%",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
