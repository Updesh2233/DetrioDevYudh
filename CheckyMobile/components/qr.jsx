import React, { useState, useEffect , useContext } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { GlobalContext } from "./context";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

export default function QRscanner({navigation}) {
  const {setData} = useContext(GlobalContext);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = ({ type, data }) => {
    setScanned(true);
    try {
      const parsedData = JSON.parse(data);
      setData((prevCarts) => [...prevCarts , parsedData.cart]);
      console.log(parsedData)
    } catch (error) {
      console.error("Invalid QR Code Data");
    }
    navigation.navigate("Home")
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      <View style = {styles.box}><Ionicons name="scan-outline" size={300} color="white" />      </View>
      <TouchableOpacity  style = {styles.button} onPress={()=> navigation.goBack()}><Ionicons name="close" size={30} color={"black"}></Ionicons></TouchableOpacity>
    </View>
  );
}

