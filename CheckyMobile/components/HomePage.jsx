import React, { useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  Text,
  View,
  FlatList,
  BackHandler,
  Alert,
  TouchableOpacity,
  Image, // Import Image component
} from "react-native";
import { GlobalContext } from "./context";
import { useTheme, Button, Card, FAB } from "react-native-paper";

const HomePage = ({ navigation }) => {
  const { data, setData } = useContext(GlobalContext);
  const { colors } = useTheme();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Exit App", "Are you sure you want to exit?", [
          { text: "Cancel", style: "cancel" },
          { text: "Exit", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  const onLongPress = (index) => {
    Alert.alert("Delete Cart", "Are you sure you want to delete?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          const newData = data.filter((_, i) => i !== index);
          setData(newData);
        },
      },
    ]);
    return true;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#b8dacc", padding: 10 }}>
      {/* Logo and Title */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "center",
          marginTop: 40,
          marginBottom: 20,
        }}
      >
        <Image
          source={require("../assets/FinalLogo.png")} // Path to your logo
          style={{ width: 90, height: 70, marginRight: 10 }} // Adjust size and spacing
        />
        <Text
          style={{
            fontSize: 32,
            textAlign: "center",
            color: "black",
            fontWeight: "bold",
          }}
        >
          CHECKY
        </Text>
      </View>

      <Text
        style={{
          fontSize: 19,
          textAlign: "left",
          color: "#475b52",
          marginBottom: 15,
          marginLeft: 10,
          fontWeight: "semibold",
        }}
      >
        📋 Scanned Carts
      </Text>

      {data?.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Card
              style={{
                marginBottom: 10,
                backgroundColor: colors.surface,
                marginLeft: 5,
                marginRight: 5,
              }}
              onPress={() => navigation.navigate("data", { data: item })}
              onLongPress={() => onLongPress(index)}
            >
              <Card.Content style={{ flexDirection: "row", alignItems: "center" }}>
                {/* Circle with Cart Logo */}
                <View
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: "lightgray",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 10,
                  }}
                >
                  <Text style={{ fontSize: 24, color: "white" }}>🛒</Text>
                </View>
                {/* Cart Text and Total */}
                <View>
                  <Text
                    style={{
                      color: colors.text,
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Cart {index + 1}
                  </Text>
                  <Text
                    style={{
                      color: colors.text,
                      fontSize: 14,
                      fontWeight: "semibold",
                      marginTop: 5,
                    }}
                  >
                    Total: ₹{item.total_price} {item.currency}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          )}
        />
      ) : (
        <Text style={{ fontSize: 16, color: colors.text, textAlign: "center" }}>
          No carts available
        </Text>
      )}

      {/* Scanner Button */}
      <FAB
        style={{
          position: "absolute",
          bottom: 80,
          right: 20,
          backgroundColor: colors.primary,
        }}
        icon="qrcode-scan"
        onPress={() => navigation.navigate("scanner")}
      />

      {/* Chatbot Button */}
      <FAB
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: colors.accent,
        }}
        icon="chat"
        onPress={() => navigation.navigate("chatbot")}
      />
    </View>
  );
};

export default HomePage;