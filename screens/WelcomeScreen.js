import React from "react";
import { ImageBackground, StyleSheet, View, Image, Text, TouchableOpacity, Button } from "react-native";


const styles = StyleSheet.create({
    container:{ 
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button:  { 
        backgroundColor: "dodgerblue",
        padding: 15,
        borderRadius: 25,
        marginVertical: 10,
    },

}); 


export default function WelcomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Button style={styles.button} title="Get Started" onPress={()=>{ 
                navigation.navigate("login-screen")
            }}></Button>
        </View>
        );
}