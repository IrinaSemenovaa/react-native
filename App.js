import React, { useState } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useRoute } from "./Screens/router";
import { loadFonts } from "./Screens/fonts";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [fontsLoaded] = loadFonts();
  if (!fontsLoaded) {
    return null;
  }

  const routing = useRoute(isAuth);

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      {routing}
    </NavigationContainer>
  );
}
