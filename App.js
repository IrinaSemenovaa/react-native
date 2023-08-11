import React, { useState } from "react";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AppLoading } from "expo";

import { store, persistor } from "./Screens/redux/store";

import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useRoute } from "./Screens/router";
import { loadFonts } from "./Screens/fonts";

import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [iasReady, setIasReady] = useState(false);
  const [user, setUser] = useState(null);

  const [fontsLoaded] = loadFonts();
  if (!fontsLoaded) {
    return null;
  }

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    console.log(user);
    setUser(user);
  });

  const routing = useRoute(user);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <StatusBar style="auto" />
          {routing}
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
