import React, { useState } from "react";
import { View, TextInput, Button, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import { useContext } from "react";
import { GlobalContext } from "./context";

const ChatbotScreen = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const { data } = useContext(GlobalContext);

    const productNames = data.flatMap(cart => cart.items.map(item => item.Name));

    const sendMessage = async () => {
        if (!input.trim()) return;

        // Add user message
        const newMessages = [{ text: input, sender: "user" }, ...messages];
        setMessages(newMessages);
        setInput(""); // Clear input immediately
        setLoading(true); // Start loading

        try {
            const response = await axios.post("https://api-lr.agent.ai/v1/agent/41v1mal7qqj8knki/webhook/4f1866c6", {
                "user_input": input + "[What I have: " + productNames + "]",
            });

            const botReply = response.data.response || "No response from bot";

            // Replace loading with bot reply
            setMessages(prevMessages => [{ text: botReply, sender: "bot" }, ...prevMessages]);
        } catch (error) {
            console.error("Error:", error);
            setMessages(prevMessages => [{ text: "Error connecting to chatbot.", sender: "bot" }, ...prevMessages]);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <View style={{ ...styles.container, backgroundColor: "#b8dacc" }}>
            <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={[
                        styles.messageContainer,
                        item.sender === "user" ? styles.userMessage : styles.botMessage
                    ]}>
                        <Text style={[styles.messageText, { color: item.sender === "bot" ? "#000" : "#fff" }]}>
                            {item.text}
                        </Text>
                    </View>
                )}
                inverted
            />

            {/* Show loading animation when bot is typing */}
            {loading && (
                <View style={[styles.messageContainer, styles.botMessage]}>
                    <ActivityIndicator size="small" color="#0078FF" />
                    <Text style={styles.typingText}>Bot is typing...</Text>
                </View>
            )}

            <View style={{...styles.inputContainer, backgroundColor: "#fff", borderRadius: 10}}>
                <TextInput
                    value={input}
                    onChangeText={setInput}
                    placeholder="Type a message..."
                    style={styles.input}
                />
                <Button title="Send" onPress={sendMessage} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#f5f5f5",
    },
    messageContainer: {
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        maxWidth: "80%",
    },
    userMessage: {
        backgroundColor: "#0078FF",
        alignSelf: "flex-end",
    },
    botMessage: {
        backgroundColor: "#E5E5EA",
        alignSelf: "flex-start",
    },
    messageText: {
        fontSize: 16,
    },
    typingText: {
        fontSize: 14,
        marginLeft: 5,
        color: "#555",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderTopWidth: 1,
        borderColor: "#ccc",
    },
    input: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginRight: 10,
    },
});

export default ChatbotScreen;
