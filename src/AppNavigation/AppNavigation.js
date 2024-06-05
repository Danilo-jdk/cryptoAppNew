import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import CustomDrawerContent from "../components/CustomDrawerContent";
import { useCrypto } from "../Context/CryptoContext";

//screens
import Home from "../screens/Home/Home";
import Portfolio from "../screens/Portfolio/Portfolio";

const Drawer = createDrawerNavigator();

export default function AppNavigation() {
  const { getCryptos } = useCrypto();

  function reload() {
    getCryptos;
    console.log("Reload!");
  }
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerRight: () => (
            <TouchableOpacity
              onPress={reload}
              style={{ marginRight: 15 }}
            >
              <Ionicons name="reload" size={22} color="white" />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: "#0F141E", // Imposta il colore dello sfondo dell'header
          },
          headerTintColor: "yellow", // Imposta il colore degli elementi dell'header (titolo, pulsanti)
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 16,
            letterSpacing: 6,
          },
          title: "CRYPTO APP",
          headerTitleAlign: 'center'
        }}
      >
        <Drawer.Screen 
        name="Home" 
        component={Home} 

        options={{
          drawerLabel: 'Lista',
          drawerLabelStyle: {fontSize: 15, color: 'white'},
          drawerIcon: () => (
             <Ionicons name="list" size={22} color="white" /> 
          )
        }}
        />

      <Drawer.Screen 
        name="Portfolio" 
        component={Portfolio} 

        options={{
          drawerLabel: 'PortFolio',
          drawerLabelStyle: {fontSize: 15, color: 'white'},
          drawerIcon: () => (
             <Ionicons name={"wallet-outline"} size={22} color="white" /> 
          )
        }}
        />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}
