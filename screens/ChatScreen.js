import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const ChatScreen = ({navigation,...props}) => {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
    }, []); 
    const onSend = (newMessages = []) => {
        setMessages(GiftedChat.append(messages, newMessages));
    };
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() =>{ 
                navigation.navigate("group-info-screen"); 
            }}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{props.route.params.name}</Text>
                <Text style={styles.headerSubtitle}>{props.route.params.description}</Text>
            </View>
            </TouchableOpacity>
            <GiftedChat
                messages={messages}
                onSend={newMessages => onSend(newMessages)}
                user={{
                    _id: 1, // user's id
                }}
                renderBubble={null}
                renderInputToolbar={null}
                renderSend={null}
                alwaysShowSend
                scrollToBottom
                placeholder="Type a message..."
                textInputProps={{
                    autoCorrect: false,
                }}
                listViewProps={{
                    style: {
                        backgroundColor: '#f5f5f5',
                    },
                }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"white",
    },
    header: {
        height: 60,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor:"white",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#888',
    },
});

export default ChatScreen;