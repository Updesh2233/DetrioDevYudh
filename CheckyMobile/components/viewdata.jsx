import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image
} from "react-native";
import { GlobalContext } from "./context";
import { Ionicons } from "@expo/vector-icons"; // Ionicons from Expo
import { styles } from "./styles";

const Data = ({ navigation, route }) => {
  const { data } = route.params || {};;
  //const { data } = useContext(GlobalContext);
  return (

    <View style={{...styles.datacontainer, backgroundColor: "#b8dacc"}}>
      <View style={styles.cartContainer}>
        <Text style={styles.title}>🛒 Your Cart</Text>

        <FlatList
          data={data?.items}
          keyExtractor={(item) => item?._id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image source={{ uri: item?.Image }} style={styles.image} />
              <View style={styles.itemDetails}>
                <Text style={styles.name}>{item?.Name}</Text>
                <Text style={styles.price}>
                  ₹ {item?.Price} x {item?.quantity}
                </Text>
                <Text style={{ color: 'red', alignSelf: 'right' }}> Expires at : {item.expiryDate}</Text>
              </View>
            </View>
          )}
        />

        <View style={styles.summary}>
          <Text style={styles.summaryText}>
            Total Price: ₹ {data?.total_price}
          </Text>
          <Text style={styles.summaryText}>Discount: ₹ {data?.discount}</Text>
          <Text style={styles.finalPrice}>
            Final Price: ₹ {data?.final_price} {data?.currency}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Data;
