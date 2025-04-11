import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QRscanner from "./components/qr";
import Data from "./components/viewdata";
import { GlobalProvider } from "./components/context";
import HomePage from "./components/HomePage";
import chatBot from "./components/chatBot";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <GlobalProvider>
        <StatusBar translucent={true} backgroundColor="transparent" barStyle="light-content" />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="data" component={Data} />
            <Stack.Screen name="scanner" component={QRscanner} />
            <Stack.Screen name="chatbot" component={chatBot} />
          </Stack.Navigator>
        </NavigationContainer>
      </GlobalProvider>
    </PaperProvider>
  );
}
