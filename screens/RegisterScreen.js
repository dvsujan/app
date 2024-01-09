import React, { useState } from "react";

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
const RegisterScreen = ({navigation}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confpass , setConfpass] = useState(""); 
  const [err , setErr] = useState(""); 
  const [loading , setLoading] = useState(false); 
  
  const handleRegister = () => {
    if(username.length < 3 && username.match(/^[a-zA-Z0-9]+$/)){
        setErr("username must be at least 3 characters")
        return ; 
        }
    if(password.length < 6 || password.length > 20){
        setErr("password must be between 6 and 20 characters")
        return ; 
        }
    if(!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
        setErr("email must be valid")
        return ; 
    }

    if(password !== confpass){
        setErr("passwords must match"); 
        return ;
    }
    setErr(""); 
    setLoading(true); 
    axios.post("http://172.20.10.3:5000/auth/register", {
        username,
        email,
        password,
      })
      .then((response) => {
        if(response.status === 200){
            navigation.navigate("login-screen");
        }
        setErr(""); 
        setLoading(false); 
      })
      .catch((error) => {
        console.log(error);
        console.log("err code" , error.response.data); 
        setErr(error.response.data.message); 
        setLoading(false); 
    });
  };
  
  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>Register</Text>
      {
            err ? <Text style={{color: "white" , backgroundColor:"red", padding:4, fontSize:14, marginBottom:10}}>{err}</Text> : null
      }
      <TextInput
        style={Styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={Styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={Styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
     <TextInput
        style={Styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confpass}
        onChangeText={setConfpass}
      />
      {
        loading?<Button title="Loading.." disabled={true} />:<Button title="Register" onPress={handleRegister} />
      }
    </View>
  );
};
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

export default RegisterScreen;
